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
               
#helper method to get list of column names for a table
def get_column_names(table_name):
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM {table_name} LIMIT 1")
    column_names = [c[0] for c in cursor.description]
    return column_names