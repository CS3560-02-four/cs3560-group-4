from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from . import daos, models
import datetime
from django.db import IntegrityError, connection
from datetime import datetime, timedelta
from django.views.decorators.csrf import csrf_exempt

# GET ALL ITEMS AVAILABLE FOR RENTAL
# RETURN ITEMS WITH AVAILABLE QUANTITY
def get_available_items(request):
    response = []
    items = daos.ItemDao.get_all_items()
    item_columns = get_column_names("item")
    for i in items:
        num_available = len(daos.ItemUnitDao.get_item_unit(item_id=i.id, rental_id=None))
        if num_available != 0:
            item_attrbts = [i.id, i.name, i.description, i.category]
            item_json = dict(zip(item_columns, item_attrbts))
            item_json["available_quantity"] = num_available
            response.append(item_json)
    return JsonResponse(response, safe=False)

# GET ALL CART ITEMS WITH ITEM INFO + AVAILABLE QUANTITY BY ACCOUNT ID
def get_cart_items(request):
    response = []
    #QUERY PARAMS: account_id
    account_id = request.GET["account_id"]

    cart_items = daos.CartItemDao.get_cart_item(account_id=account_id) #get all cart items for account
    cart_item_columns = get_column_names("cart_item")
    item_columns = get_column_names("item")
    for i in cart_items:
        item = daos.ItemDao.get_item(item_id=i.item_id)[0] #get Item associated with this CartItem
        item_attrbts = [item.id, item.name, item.description, item.category]
        cart_item_attrbts = [i.id, i.item_id, i.quantity, i.account_id]
        num_available = len(daos.ItemUnitDao.get_item_unit(item_id=item.id, rental_id=None))
        cart_item_json = dict(zip(cart_item_columns, cart_item_attrbts))
        cart_item_json.update(dict(zip(item_columns, item_attrbts)))
        cart_item_json["available_quantity"] = num_available
        response.append(cart_item_json)
    return JsonResponse(response, safe=False)

# ADD ITEM TO CART
# IF EXISTS INCREASE QUANTITY
# BY ACCOUNT ID AND ITEM ID
def add_to_cart(request):
    #Check if item not available
    item_id = request.GET["item_id"]

    #check how many available
    item_units_check = daos.ItemUnitDao.get_item_unit(item_id=item_id, rental_id=None) #get units not associated with a rental
    print(item_units_check)
    sum_available = len(item_units_check) #get total number of available units
    if sum_available == 0:
        return HttpResponse("Item not available", status=500)

    try:
        #QUERY PARAMS: account_id, item_id
        account_id = request.GET["account_id"]
        item_id = request.GET["item_id"]

        existing_cart_items = daos.CartItemDao.get_cart_item(account_id=account_id, item_id=item_id)
        if len(existing_cart_items) == 1:
            #Item already exists in cart; update quantity
            cart_item = existing_cart_items[0] #get already existing CartItem
            #Check if next unit available
            if cart_item.quantity >= sum_available:
                return HttpResponse("Item not available", status=500) #No more available, can't add more to cart
            daos.CartItemDao.update_cart_item_quantity(cart_item.id, cart_item.quantity + 1) #update quantity in DB by 1
        else:
            #Item does not exist in cart, create new CartItem with quantity 1 - this is not executed if no more available
            cart_item = models.CartItem(0, item_id, 1, account_id) #new CartItem
            daos.CartItemDao.insert_cart_item(cart_item) #insert in table in DB
        return HttpResponse("Item successfully added to cart", status=201)
    except IntegrityError:
        return HttpResponse("Error: Account not found or wrong item ID", status=500)

#DELETE ALL UNITS OF ITEM FROM CART
def delete_from_cart(request):
    #QUERY PARAMS: cart_item_id
    cart_item_id = request.GET["cart_item_id"]

    daos.CartItemDao.delete_cart_item(cart_item_id) #delete from DB
    return HttpResponse("Item successfully deleted from cart", status=200) # TODO: STATUS RESPONSE

# DECREASE OR INCREASE CART ITEM QUANTITY
def update_cart_item_quantity(request):
    #QUERY PARAMS: cart_item_id, new_quantity
    cart_item_id = request.GET["cart_item_id"]
    new_quantity = int(request.GET["new_quantity"])

    #check if item deleted completely
    if new_quantity == 0:
        daos.CartItemDao.delete_cart_item(cart_item_id)
        return HttpResponse("Quantity updated", status=201)

    #get item id
    try:
        cart_item = daos.CartItemDao.get_cart_item(cart_item_id=cart_item_id)[0]
    except IndexError:
        return HttpResponse("Invalid cart item ID", status=500)

    item_id = cart_item.item_id

    #quantity check if increasing
    if new_quantity > cart_item.quantity:
        item_units_check = daos.ItemUnitDao.get_item_unit(item_id=item_id, rental_id=None) #get units not associated with a rental
        sum_available = len(item_units_check) #get total number of available units

        if new_quantity > sum_available:
            return HttpResponse("Desired quantity not available", status=500)

    daos.CartItemDao.update_cart_item_quantity(cart_item_id, new_quantity) #update cart item quantity in DB
    return HttpResponse("Quantity updated", status=201) # TODO: STATUS REPONSE

#GET RENTAL BY RENTAL ID WITH ALL ITEMS WITH INFO
def get_rental(request):
    #QUERY PARAMS: rental_id
    rental_id = request.GET["rental_id"]

    #add rental info to response
    try:
        rental = daos.RentalDao.get_rental(rental_id=rental_id)[0] #get rental
    except IndexError:
        return HttpResponse("Error: Rental does not exist", status=500)

    rental_columns = get_column_names("rental")
    rental_attrbts = [rental.id, rental.status, rental.pickup_date_time, rental.return_date_time, rental.student_id]
    response = dict(zip(rental_columns, rental_attrbts)) #add rental info to response

    #add item info to response
    item_columns = get_column_names("item")
    item_unit_columns = get_column_names("item_unit")
    item_units = daos.ItemUnitDao.get_item_unit(rental_id=rental_id) #get item units associated with rental
    items = []
    for i in item_units:
        item = daos.ItemDao.get_item(item_id=i.item_id)[0] #get item info
        item_attrbts = [item.id, item.name, item.description, item.category]
        item_info = dict(zip(item_columns, item_attrbts)) #add item general info to dict
        item_info["status"] = i.status #add item unit status to dict
        items.append(item_info) #add to list of items

    response["items"] = items #add list of items to response
    return JsonResponse(response, safe=False)

# Cancel rental
def cancel_rental(request):
    rental_id = request.GET["rental_id"]
    daos.RentalDao.update_rental_status(rental_id, "canceled")
    item_unit = daos.ItemUnitDao.get_item_unit(rental_id=rental_id)
    rental_id_items = []
    for i in item_unit:
        daos.ItemUnitDao.update_item_unit_rental(i.id, None)
    return HttpResponse("Rental successfully canceled", status = 200)

# Logs a user in.  NOT SURE HOW TO STORE THAT A USER HAS LOGGED IN.
@csrf_exempt
def login(request):
    req_body = request.POST
    user = req_body["username"]
    passw = req_body["password"]

    account = daos.AccountDao.get_account(username = user)
    if len(account) < 1:
        return HttpResponse("Username not found", status = 500)
    account = account[0] # "unwrap" the account such that it is not in a list.

    if passw == account.password:
        return JsonResponse({"account_id" : account.id}, safe=False) # Successful login
    else:
        return HttpResponse("Login failed", status = 500) # Failed login

# Gets user rentals based on a request with a valid account_id
def getUserRentals(request):
    acc_id = request.GET["account_id"]

    rentals = daos.RentalDao.get_rental(account_id = acc_id)

    if len(rentals) < 1:
        return HttpResponse("No rentals found", status = 200)

    rental_attributes = [(i.id, i.status, i.pickup_date_time, i.return_date_time, i.student_id) for i in rentals] #get list of tuples, each containing values of attributes of each rental
    columns = get_column_names("rental") #get list of column names
    result = []
    for i in rental_attributes:
        rental_dict = dict(zip(columns, i)) # Zip together column names and the corresponding value
        result.append(rental_dict) #this creates a dictionary for each item, keys are column names and values are the actual attribute values
        # result is the final list of dictionaries each representing a rental
    return JsonResponse(result, safe=False) #return a Json response with those items - see what this looks like at url inventory_rental_cs/exampleJson

# Gets Account details based on a request with an account_id
def getAccountDetails(request):
    acc_id = request.GET["account_id"]
    accounts = daos.AccountDao.get_account(account_id = acc_id)

    if len(accounts) < 1:
        return HttpResponse("Account not found", status = 500)

    account_attributes = [(i.id, i.username, i.password, i.email, i.first_name, i.last_name, i.address, i.admin, i.student, i.status, i.balance) for i in accounts]
    columns = get_column_names("account")
    result = []

    for acc in account_attributes:
        result.append(dict(zip(columns, acc)))
    return JsonResponse(result, safe=False)

# Makes a rental based on the cart of a given user (account_id is given) (NOT TRIED)
@csrf_exempt
def createRental(request):

    # Get request body
    req_body = request.POST
    print(req_body)
    # Get account id from url
    acc_id = request.GET["account_id"]

    # First, ensure that there are items in the cart
    cart_items = daos.CartItemDao.get_cart_item(account_id = acc_id)

    # Check if there is nothing in cart
    if len(cart_items) < 1:
        return HttpResponse("Nothing in cart", status = 500)

    # Go through each item type in cart, and ensure that there are enough items to rent out.
    for cart_item in cart_items:
        # Get all available units
        relevant_units = daos.ItemUnitDao.get_item_unit(item_id = cart_item.item_id, status = "normal", rental_id = None)

        # If there are not enough items to rent out, failure.
        if len(relevant_units) < cart_item.quantity:
            item_name = daos.ItemDao.get_item(item_id = cart_item.item_id)[0].name
            return HttpResponse(f"Not enough of {item_name}", status = 500)

    # After ensuring that there are enough items to rent out, start creating the rental.

    # TODO Date time getting testing.
    pickup_time = req_body["pickup"]
    return_time = req_body["return"]

    rental = models.Rental(id = 0, status = "reserved", pickup_date_time = pickup_time, return_date_time=return_time, student_id=acc_id)
    daos.RentalDao.insert_rental(rental)

    # Get rental_id
    appt = daos.RentalDao.get_rental(status = "reserved", pickup_datetime = pickup_time, return_datetime = return_time, account_id = acc_id)
    appt_attributes = [(i.id, i.status, i.pickup_date_time, i.return_date_time, i.student_id) for i in appt]
    rental_id = appt_attributes[0][0]

    # Go through each item type, and rent out (change rental id) of those items.
    for cart_item in cart_items:
        # Get all available units
        relevant_units = daos.ItemUnitDao.get_item_unit(item_id = cart_item.item_id, status = "normal", rental_id = None)
        # For each unit, update their rental_id to match the new rental
        count = cart_item.quantity
        for renting_item in relevant_units:
            if count <= 0:
                break
            daos.ItemUnitDao.update_item_unit_rental(renting_item.id, rental_id)
            count -= 1

    # Clears cart
    daos.CartItemDao.clear_cart(acc_id)

    # Success
    return HttpResponse("Successfully created rental", status = 200)

#helper method to get list of column names for a table
def get_column_names(table_name):
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM {table_name} LIMIT 1")
    column_names = [c[0] for c in cursor.description]
    return column_names


#ADMIN ENDPOINTS

# Get all existing rentals with their respective account info and list of item units
def get_all_rentals(request):
    # combine each rental info with its account info
    # get list of items for each rental, combine with the rest

    # get column names for rental, item_unit, and account
    rental_columns = get_column_names("rental")
    item_unit_columns = get_column_names("item_unit")
    account_columns = get_column_names("account")
    account_columns.remove("username")
    account_columns.remove("password")
    account_columns.remove("admin")
    account_columns.remove("student")
    account_columns.remove("status")
    account_columns.remove("balance")

    response = []

    #get all rentals
    rentals = daos.RentalDao.get_all_rentals()

    #add rentals with their respecitve account info to resposne
    for r in rentals:
        #add rental info to a dict
        rental_attributes = [r.id, r.status, r.pickup_date_time, r.return_date_time, r.student_id]
        rental_info = dict(zip(rental_columns, rental_attributes))
        #add account info to a dict
        account = daos.AccountDao.get_account(account_id=r.student_id)[0]
        account_attributes = [account.id, account.email, account.first_name, account.last_name, account.address]
        account_info = dict(zip(account_columns, account_attributes))

        #join rental and account info
        rental_info.update(account_info)

        #get items associated with rental
        items_in_rental = daos.ItemUnitDao.get_item_unit(rental_id=r.id)
        item_list = []

        for i in items_in_rental:
            #get item unit info and add it to list
            item_unit_attributes = [i.id, i.rental_id, i.item_id, i.status]
            item_unit_info = dict(zip(item_unit_columns, item_unit_attributes))
            item_name = daos.ItemDao.get_item(item_id=i.item_id)[0].name
            item_unit_info["item_name"] = item_name #add item name in addition to item unit info
            item_list.append(item_unit_info)

        # item list complete, add it to rental info
        rental_info["items"] = item_list

        # add complete rental info to response
        response.append(rental_info)

    # rental list complete, return response
    return JsonResponse(response, safe=False)


# Change quantity of an item in inventory
def change_inventory_quantity(request):
    #QUERY PARAMS: item_id, new_quantity
    item_id = request.GET["item_id"]
    new_quantity = int(request.GET["new_quantity"])

    # get existing units of item and current_quantity
    existing_units = daos.ItemUnitDao.get_item_unit(item_id=item_id)
    current_quantity = len(existing_units)

    #Send message if new quantity is the same as current
    if current_quantity == new_quantity:
        return HttpResponse("Quantity not changed", status=200)

    #check if increase or decrease
    if new_quantity > current_quantity: #Increase quantity
        for i in range(new_quantity - current_quantity):
            new_item_unit = models.ItemUnit(0, None, item_id, "normal")
            daos.ItemUnitDao.insert_item_unit(new_item_unit)
        return HttpResponse(f"Inventory quantity increased for item_id {item_id}", status=200)
    else: #Decrease quantity
        # Check if possible to delete desired quantity
        # First, check how many units are not assigned to rentals
        can_be_deleted = list(filter(lambda i: i.rental_id == None, existing_units))

        if current_quantity - new_quantity > len(can_be_deleted):
            # Send message if new quantity too low
            return HttpResponse("New quantity too low. Not enough units available for deletion.", status=500)
        
        # Quantity checked, delete item units from DB
        quantity_to_be_deleted = current_quantity - new_quantity
        count_deleted = 0 #counter to check how many are deleted and when to stop
        while count_deleted < quantity_to_be_deleted:
            item_to_delete = can_be_deleted.pop()
            daos.ItemUnitDao.delete_item_unit(item_to_delete.id)
            count_deleted += 1

        # To avoid inconsistencies, when quantity is decreased we remove that item from all carts
        cart_items_to_delete = daos.CartItemDao.get_cart_item(item_id=item_id)
        for i in cart_items_to_delete:
            daos.CartItemDao.delete_cart_item(i.id)

        # Item units deleted, return response
        return HttpResponse("Item units successfully deleted from inventory", status=200)

#GET ALL UNITS FOR A GIVEN ITEM
def get_item_units_for_item(request):
    # QUERY PARAMS: item_id
    item_id = request.GET["item_id"]

    item_unit_columns = get_column_names("item_unit")
    #get list of ItemUnits
    item_units = daos.ItemUnitDao.get_item_unit(item_id=item_id)

    response = []

    #add each item unit to response
    for i in item_units:
        item_unit_attributes = [i.id, i.rental_id, i.item_id, i.status]
        item_unit_data = dict(zip(item_unit_columns, item_unit_attributes))
        response.append(item_unit_data)

    if len(response) == 0:
        #Send message if no item units exist with given item ID
        return HttpResponse("Item not in inventory", status=500)

    return JsonResponse(response, safe=False)

# Get ALL item data + total quantity, not just available for rental
def get_all_items_admin(request):
    response = []
    items = daos.ItemDao.get_all_items()
    item_columns = get_column_names("item")
    item_columns.remove("category")
    for i in items:
        total_quantity = len(daos.ItemUnitDao.get_item_unit(item_id=i.id))
        item_attrbts = [i.id, i.name, i.description]
        item_json = dict(zip(item_columns, item_attrbts))
        item_json["total_quantity"] = total_quantity
        response.append(item_json)
    return JsonResponse(response, safe=False)