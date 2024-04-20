from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from . import daos, models
import datetime
from django.db import connection

from django.views.decorators.csrf import csrf_exempt

from .models import Item
from .models import CartItem
import json

# Create your views here.

# Gets all Laptops
def test_laptops(request):
    laptops = daos.ItemDao.get_item(category="Laptops")
    laptop_attributes = [(laptop.id, laptop.name, laptop.description, laptop.category) for laptop in laptops]
    columns = get_column_names("item")  # Define column names
    laptop_data = []
    for laptop_attr in laptop_attributes:
        laptop_dict = dict(zip(columns, laptop_attr))
        laptop_data.append(laptop_dict)
    return JsonResponse(laptop_data, safe=False)

# Gets all Calculators 
def test_calculators(request):
    calculators = daos.ItemDao.get_item(category="Calculators")
    calculator_attributes = [(calculators.id, calculators.name, calculators.description, calculators.category) for calculators in calculators]
    columns = get_column_names("item")  # Define column names
    calculator_data = []
    for calculator_attr in calculator_attributes:
        calculator_dict = dict(zip(columns, calculator_attr))
        calculator_data.append(calculator_dict)
    return JsonResponse(calculator_data, safe=False)

# Gets all Mice
def test_mice(request):
    mice = daos.ItemDao.get_item(category="Mice")
    mice_attributes = [(mice.id, mice.name, mice.description, mice.category) for mice in mice]
    columns = get_column_names("item")  # Define column names
    mice_data = []
    for mice_attr in mice_attributes:
        mice_dict = dict(zip(columns, mice_attr))
        mice_data.append(mice_dict)
    return JsonResponse(mice_data, safe=False)

# Gets all Headsets
def test_headsets(request):
    headsets = daos.ItemDao.get_item(category="Headsets")
    headsets_attributes = [(headsets.id, headsets.name, headsets.description, headsets.category) for headsets in headsets]
    columns = get_column_names("item")  # Define column names
    headsets_data = []
    for headsets_attr in headsets_attributes:
        headsets_dict = dict(zip(columns, headsets_attr))
        headsets_data.append(headsets_dict)
    return JsonResponse(headsets_data, safe=False)

# Gets all Chargers 
def test_chargers(request):
    chargers = daos.ItemDao.get_item(category="Chargers")
    chargers_attributes = [(chargers.id, chargers.name, chargers.description, chargers.category) for chargers in chargers]
    columns = get_column_names("item")  # Define column names
    chargers_data = []
    for chargers_attr in chargers_attributes:
        chargers_dict = dict(zip(columns, chargers_attr))
        chargers_data.append(chargers_dict)
    return JsonResponse(chargers_data, safe=False)

# Gets all items
def test2(request):
    data = daos.ItemDao.get_all_items()
    print(data)
    return HttpResponse(data)

# Inserts Item to Cart 
def test3(request):
    cart_item = models.CartItem(0, 1, 6, 1)
    daos.CartItemDao.insert_cart_item(cart_item)
    return HttpResponse()


# To test input as follows
# http://127.0.0.1:8000/inventory_rental/cartiteminfo/?account_id=3
# It should display all the cart info of given account_id
# If not it displays error message
# Get Cart Item Info
def test4(request):
    # Get the account ID from the query parameters
    account_id = request.GET.get('account_id')
    account = daos.AccountDao.get_account(account_id=account_id)
    # Check if the account exists
    if account:
        cart_items = daos.CartItemDao.get_cart_item(account_id=account_id)
        cart_items_data = []
        for cart_item in cart_items:
            item_data = {
                'item_id': cart_item.item_id,
                'quantity': cart_item.quantity,
                'account_id': cart_item.account_id,
            }
            cart_items_data.append(item_data)
        return JsonResponse(cart_items_data, safe=False)
    else:
        return JsonResponse({'error': 'Account not found'}, status=404)

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

# Cancel rental
def cancel_rental(request):
    rental_id = request.GET["rental_id"]
    daos.RentalDao.update_rental_status(rental_id, "canceled")
    item_unit = daos.ItemUnitDao.get_item_unit(rental_id=rental_id)
    rental_id_items = [] 
    for i in item_unit:
        daos.ItemUnitDao.update_item_unit_rental(i.id, None)
    return HttpResponse("Rental successfully canceled", status = 200)

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
    daos.ItemUnitDao.get_all_item_units()
    return HttpResponse()

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

@csrf_exempt
def test_view(request):
    req_body = request.POST #dictionary
    print(req_body["username"]) #example
    return HttpResponse()


