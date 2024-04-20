from django.urls import path
from . import views

urlpatterns = [
    #urls for testing
    path("get-available-items/", views.get_available_items), #DONE, get all items available for rental and their quantities
    path("get-cart-items/", views.get_cart_items), #DONE, get all cart items for account, account_id is passed as QUERY PARAMETER
    path("add-to-cart/", views.add_to_cart), #DONE, add item to an account's cart, account_id and item_id passed as QUERY PARAMETERS
    path("delete-from-cart/", views.delete_from_cart), #DONE, delete all units of an item from account's cart, QUERY PARAMS: cart_item_id
    path("update-cart-item-quantity/", views.update_cart_item_quantity), #DONE, update quantity of an item in cart, QUERY PARAMS: cart_item_id, new_quantity

    path("exampleJson/", views.test_json) #USE THIS FOR THE EXAMPLE JSON METHOD
]
