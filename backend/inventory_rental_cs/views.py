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