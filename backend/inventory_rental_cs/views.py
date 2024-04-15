from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from . import daos, models
import datetime

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