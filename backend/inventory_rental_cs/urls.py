from django.urls import path
from . import views

urlpatterns = [
    #urls for testing
    path("get-available-items/", views.get_available_items), #DONE, get all items available for rental and their quantities
    path("get-cart-items/", views.get_cart_items), #DONE, get all cart items for account, account_id is passed as QUERY PARAMETER
    path("add-to-cart/", views.add_to_cart), #DONE, add item to an account's cart, account_id and item_id passed as QUERY PARAMETERS
    path("delete-from-cart/", views.delete_from_cart), #DONE, delete all units of an item from account's cart, QUERY PARAMS: cart_item_id
    path("update-cart-item-quantity/", views.update_cart_item_quantity), #DONE, update quantity of an item in cart, QUERY PARAMS: cart_item_id, new_quantity
    path("get-rental/", views.get_rental), #DONE, get rental info and list of its items, QUERY PARAMS: rental_id
    path("login", views.login), # Logs in user, PASSWORD AND USERNAME IS IN request.POST
    path("accountInfo/", views.getAccountDetails), # Gets account info, use ?account_id=___ in url
    path("rentalDetails/", views.getUserRentals),  # Gets all rentals associated with a user, use ?account_id=___ in url
    path("createAppointment/", views.createRental), # Creates a rental using a user's cart, use ?account_id=___ in url
    path("rentalCancel/", views.cancel_rental),
    path("confirm-pickup/", views.confirm_rental_pickup), # DONE Confirms rental pickup, QUERY PARAMS: rental_id
    path("confirm-return/", views.confirm_rental_return) # DONE Confirms rental return, QUERY PARAMS: rental_id
]
