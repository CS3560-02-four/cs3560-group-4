from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from . import daos, models
import datetime
from django.db import connection

# Create your views here.

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
    daos.ItemUnitDao.get_all_rental_items()
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