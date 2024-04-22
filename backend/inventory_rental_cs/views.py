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
    item_units_check = daos.ItemUnitDao.get_item_unit(item_id=item_id, rental_id=None) #get units not associated with a rental
    cart_items_check = daos.CartItemDao.get_cart_item(item_id=item_id) #get items already added to cart(s)
    quantity_in_carts = 0
    for c in cart_items_check:
        quantity_in_carts += c.quantity #calculate quantity already in cart(s)
    sum_available = len(item_units_check) - quantity_in_carts #get total number of available units

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
            daos.CartItemDao.update_cart_item_quantity(cart_item.id, cart_item.quantity + 1) #update quantity in DB by 1
        else:
            #Item does not exist in cart, create new CartItem with quantity 1
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
    new_quantity = request.GET["new_quantity"]

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
    print(req_body)
    user = req_body["username"]
    passw = req_body["password"]

    print(user)
    print(passw)

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
def createRental(request):

    # Get account id from url
    acc_id = request.GET["account_id"]

    # First, ensure that there are items in the cart
    cart_items = daos.CartItemDao.get_cart_item(account_id = acc_id)
    cart_item_attributes = [(i.id, i.item_id, i.quantity, i.account_id) for i in cart_items]

    # Check if there is nothing in cart
    if len(cart_items) < 1:
        return HttpResponse("Nothing in cart", status = 500)
    
    # Go through each item type, and ensure that there are enough items to rent out.
    for cart_item in cart_items:
        # Get all available units
        relevant_units = daos.ItemUnitDao.get_item_unit(item_id = cart_item.item_id, status = "normal", rental_id = None)

        # If there are not enough items to rent out, failure.
        if len(relevant_units) < cart_item_attributes[0][3]:
            item_name = daos.ItemDao.get_item(item_id = cart_item.item_id)[0].name
            return HttpResponse(f"Not enough of {item_name}", status = 500)
    
    # After ensuring that there are enough items to rent out, start creating the rental.
    
    # TODO Date time getting.
    pickup_time = datetime.now()
    return_time = (datetime.now() + timedelta(days = 7))

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
    # Success
    return HttpResponse("Successfully created rental", status = 200)
               
#helper method to get list of column names for a table
def get_column_names(table_name):
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM {table_name} LIMIT 1")
    column_names = [c[0] for c in cursor.description]
    return column_names
