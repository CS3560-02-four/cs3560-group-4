from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from . import daos, models
import datetime
from django.db import connection

from django.views.decorators.csrf import csrf_exempt

from .models import Item
from .models import CartItem
import json

# Cancel rental
def cancel_rental(request):
    rental_id = request.GET["rental_id"]
    daos.RentalDao.update_rental_status(rental_id, "canceled")
    item_unit = daos.ItemUnitDao.get_item_unit(rental_id=rental_id)
    rental_id_items = [] 
    for i in item_unit:
        daos.ItemUnitDao.update_item_unit_rental(i.id, None)
    return HttpResponse("Rental successfully canceled", status = 200)

    
#helper method to get list of column names for a table
def get_column_names(table_name):
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM {table_name} LIMIT 1")
    column_names = [c[0] for c in cursor.description]
    return column_names



