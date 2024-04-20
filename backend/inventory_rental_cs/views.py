from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from . import daos, models
import datetime
from django.db import connection

# GET ALL ITEMS AVAILABLE FOR RENTAL
# RETURN ITEMS WITH AVAILABLE QUANTITY
# TODO: ERROR CATCHING
def get_available_items(request):
    response = []
    items = daos.ItemDao.get_all_items()
    item_columns = get_column_names("item")
    for i in items:
        num_available = len(daos.ItemUnitDao.get_item_unit(item_id=i.id, rental_id=None))
        if num_available != 0:
            item_attrbts = [i.id, i.name, i.description, i.category]
            item_json = dict(zip(item_columns, item_attrbts))
            item_json["available_quantity"] = num_available
            response.append(item_json)
    return JsonResponse(response, safe=False)

# GET ALL CART ITEMS WITH ITEM INFO + AVAILABLE QUANTITY BY ACCOUNT ID
def get_cart_items(request):
    response = []
    #QUERY PARAMS: account_id
    account_id = request.GET["account_id"]

    cart_items = daos.CartItemDao.get_cart_item(account_id=account_id) #get all cart items for account
    cart_item_columns = get_column_names("cart_item")
    item_columns = get_column_names("item")
    for i in cart_items:
        item = daos.ItemDao.get_item(item_id=i.item_id)[0] #get Item associated with this CartItem
        item_attrbts = [item.id, item.name, item.description, item.category]
        cart_item_attrbts = [i.id, i.item_id, i.account_id, i.quantity]
        num_available = len(daos.ItemUnitDao.get_item_unit(item_id=item.id, rental_id=None))
        cart_item_json = dict(zip(cart_item_columns, cart_item_attrbts))
        cart_item_json.update(dict(zip(item_columns, item_attrbts)))
        cart_item_json["available_quantity"] = num_available
        response.append(cart_item_json)
    return JsonResponse(response, safe=False)

# ADD ITEM TO CART
# IF EXISTS INCREASE QUANTITY
# BY ACCOUNT ID AND ITEM ID
def add_to_cart(request):
    #QUERY PARAMS: account_id, item_id
    account_id = request.GET["account_id"]
    item_id = request.GET["item_id"]

    existing_cart_items = daos.CartItemDao.get_cart_item(account_id=account_id, item_id=item_id)
    if len(existing_cart_items) == 1:
        #Item already exists in cart; update quantity
        cart_item = existing_cart_items[0] #get already existing CartItem
        daos.CartItemDao.update_cart_item_quantity(cart_item.id, cart_item.quantity + 1) #update quantity in DB by 1
    else:
        #Item does not exist in cart, create new CartItem with quantity 1
        cart_item = models.CartItem(0, item_id, 1, account_id) #new CartItem
        daos.CartItemDao.insert_cart_item(cart_item) #insert in table in DB
    return HttpResponse("Item successfully added to cart", status=201)

#DELETE ALL UNITS OF ITEM FROM CART
def delete_from_cart(request):
    #QUERY PARAMS: cart_item_id
    cart_item_id = request.GET["cart_item_id"]

    daos.CartItemDao.delete_cart_item(cart_item_id) #delete from DB
    return HttpResponse("Item successfully deleted from cart", status=200) # TODO: STATUS RESPONSE

# DECREASE OR INCREASE CART ITEM QUANTITY 
def update_cart_item_quantity(request):
    #QUERY PARAMS: cart_item_id, new_quantity
    cart_item_id = request.GET["cart_item_id"]
    new_quantity = request.GET["new_quantity"]

    daos.CartItemDao.update_cart_item_quantity(cart_item_id, new_quantity) #update cart item quantity in DB
    return HttpResponse("Quantity updated", status=201) # TODO: STATUS REPONSE

# def cancel_rental(request, rental_id):
#     return HttpResponse()

# #GET RENTAL BY RENTAL ID WITH ALL ITEMS WITH INFO AND QUANTITY IN RENTAL
# def get_rental(request):
#     return HttpResponse()

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