from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from . import daos, models

# Create your views here.

#test api view, return Json with all items in category Laptops
def test(request):
    data = daos.ItemDao.get_item(category="Laptops")
    return JsonResponse(data, safe=False)

#test, returns Json with all items
def test2(request):
    data = daos.ItemDao.get_all_items()
    return JsonResponse(data, safe=False)