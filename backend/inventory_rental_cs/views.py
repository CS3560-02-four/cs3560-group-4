from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from . import daos, models

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

def test5(request):
    data = daos.AccountDao.get_account(first_name='Milosz')
    print(data[0].username)
    return HttpResponse(data)