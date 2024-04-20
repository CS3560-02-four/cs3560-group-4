from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from . import daos, models
import datetime
from django.db import IntegrityError, connection

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
        cart_item_attrbts = [i.id, i.item_id, i.quantity, i.account_id]
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
    try:
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
    except IntegrityError:
        return HttpResponse("Error: Account not found or wrong item ID", status=500)


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

#GET RENTAL BY RENTAL ID WITH ALL ITEMS WITH INFO
def get_rental(request):
    #QUERY PARAMS: rental_id
    rental_id = request.GET["rental_id"]    

    #add rental info to response
    try:
        rental = daos.RentalDao.get_rental(rental_id=rental_id)[0] #get rental
    except IndexError:
        return HttpResponse("Error: Rental does not exist", status=500)

    rental_columns = get_column_names("rental")
    rental_attrbts = [rental.id, rental.status, rental.pickup_date_time, rental.return_date_time, rental.student_id]
    response = dict(zip(rental_columns, rental_attrbts)) #add rental info to response

    #add item info to response
    item_columns = get_column_names("item")
    item_unit_columns = get_column_names("item_unit")
    item_units = daos.ItemUnitDao.get_item_unit(rental_id=rental_id) #get item units associated with rental
    items = []
    for i in item_units:
        item = daos.ItemDao.get_item(item_id=i.item_id)[0] #get item info
        item_attrbts = [item.id, item.name, item.description, item.category]
        item_info = dict(zip(item_columns, item_attrbts)) #add item general info to dict
        item_info["status"] = i.status #add item unit status to dict
        items.append(item_info) #add to list of items
    
    response["items"] = items #add list of items to response

    return JsonResponse(response, safe=False)

#helper method to get list of column names for a table
def get_column_names(table_name):
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM {table_name} LIMIT 1")
    column_names = [c[0] for c in cursor.description]
    return column_names