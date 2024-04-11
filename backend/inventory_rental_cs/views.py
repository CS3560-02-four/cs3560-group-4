from django.shortcuts import render
from django.http import HttpResponse
from . import daos, models

# Create your views here.

def insertItem(request):
    daos.ItemDao.insertItem()
    return HttpResponse("Item inserted successfully")

def getAllItems(request):
    items = daos.ItemDao.getAllItems()
    return HttpResponse(items)