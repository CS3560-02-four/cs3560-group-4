from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from . import daos, models
import datetime
from django.db import connection
from datetime import datetime, timedelta
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

# Logs a user in.  NOT SURE HOW TO STORE THAT A USER HAS LOGGED IN. 
@csrf_exempt
def login(request):
    req_body = request.POST
    user = request.GET["username"]
    passw = req_body["password"]
    account = daos.AccountDao.get_account(username = user)
    if len(account) < 1:
        return HttpResponse("Username not found", status = 500)
    account = account[0] # "unwrap" the account such that it is not in a list.
    
    if passw == account.password:
        return JsonResponse([{"account_id" : account.id}], safe=False) # Successful login
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
        units_in_rental = daos.ItemUnitDao.get_item_unit(rental_id = i[0])

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
            

def test(request):
    data = daos.ItemDao.get_item(category="Laptops")
    print(data)
    return HttpResponse(data)

def test2(request):
    data = daos.ItemDao.get_all_items()
    print(data)
    return HttpResponse(data)

def test3(request):
    cart_item = models.CartItem(0, 1, 6, 1)
    daos.CartItemDao.insert_cart_item(cart_item)
    return HttpResponse()

def test4(request):
    cart_item = models.CartItem(0, 1, 6, 1)
    item = daos.CartItemDao.get_item_info(cart_item)
    return HttpResponse(item.name)

# Testing rental insert
def test5(request):
    # Create datetime objects using Python's datetime module
    pickup_date_time = datetime.datetime(2024, 4, 14)
    return_date_time = datetime.datetime(2024, 5, 14)

    rental = models.Rental(1, pickup_date_time, return_date_time, 'pending', 6)
    daos.RentalDao.insert_rental(rental)
    return HttpResponse()

    # TODO: Will need to write get_studentID method to assign the rental to the student, instead of hardcoding it in

# Testing rental update
def test6(request):
    daos.RentalDao.update_rental_status(0, 'picked up')
    return HttpResponse()

    # TODO: Possibly allow staff to modify the pickup/return datetime? (May not be necessary for the sake of time)

# Testing rental delete
def test7(request):
    daos.RentalDao.delete_rental(0)
    return HttpResponse()

# Testing rental item insert
def test8(request):
    rental_item = models.ItemUnit(1, "damaged", 2, 1)
    daos.ItemUnitDao.insert_rental_item(rental_item)
    return HttpResponse()

# Testing rental item update
def test9(request):
    daos.ItemUnitDao.update_rental_item_status(0, 'damaged')
    return HttpResponse()

# Testing rental item delete
def test10(request):
    daos.ItemUnitDao.delete_rental_item(0)
    return HttpResponse()

def test11(request):
    daos.RentalDao.get_all_rentals()
    return HttpResponse()

def test12(request):
    daos.ItemUnitDao.get_item_unit(rental_item_id=0)
    return HttpResponse()

def test13(request):
    items = daos.ItemUnitDao.get_item_unit(status = "wrong")
    item_attributes = [(i.id, i.rental_id, i.item_id, i.status) for i in items] #get list of tuples, each containing values of attributes of each item
    columns = get_column_names("item_unit") #get list of column names
    result = [] 
    for i in item_attributes:
        result.append(dict(zip(columns, i))) #this creates a dictionary for each item, keys are column names and values are the actual attribute values
        # result is the final list of dictionaries each representing an item
    return JsonResponse(result, safe=False) #return a Json response with those items - see what this looks like at url inventory_rental_cs/exampleJson

# Returns rentals 
def test14(request):
    rentals = daos.RentalDao.get_all_rentals()
    rental_attributes = [(i.id, i.status, i.pickup_date_time, i.return_date_time, i.student_id) for i in rentals] #get list of tuples, each containing values of attributes of each rental
    columns = get_column_names("rental") #get list of column names
    result = [] 
    for i in rental_attributes:
        rental_dict = dict(zip(columns, i)) # Zip together column names and the corresponding value
        rental_dict.update({"student" : daos.AccountDao.get_account(account_id=i[4])[0].first_name}) # Add the student first name to the dictionary
        units_in_rental = daos.ItemUnitDao.get_item_unit(rental_id = i[0])
        for j,unit in enumerate(units_in_rental):
            rental_dict.update({f"item {j + 1}":daos.ItemDao.get_item(item_id = unit.item_id)[0].name})

        result.append(rental_dict) #this creates a dictionary for each item, keys are column names and values are the actual attribute values
        # result is the final list of dictionaries each representing an item
    return JsonResponse(result, safe=False) #return a Json response with those items - see what this looks like at url inventory_rental_cs/exampleJson

#example Json response - get all items
def test_json(request):
    items = daos.ItemDao.get_all_items() #get list of all items
    item_attributes = [(i.id, i.name, i.description, i.category) for i in items] #get list of tuples, each containing values of attributes of each item
    columns = get_column_names("item") #get list of column names
    result = [] 
    for i in item_attributes:
        result.append(dict(zip(columns, i))) #this creates a dictionary for each item, keys are column names and values are the actual attribute values
        # result is the final list of dictionaries each representing an item
    return JsonResponse(result, safe=False) #return a Json response with those items - see what this looks like at url inventory_rental_cs/exampleJson
    
#helper method to get list of column names for a table
def get_column_names(table_name):
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM {table_name} LIMIT 1")
    column_names = [c[0] for c in cursor.description]
    return column_names