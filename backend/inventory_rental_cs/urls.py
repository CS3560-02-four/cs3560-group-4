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
    path("login", views.studentLogin), # Logs in student, QUERY PARAMS: username, password
    path("admin-login/", views.adminLogin), # Logs in admin, QUERY PARAMS: username, password
    path("accountInfo/", views.getAccountDetails), # Gets account info, use ?account_id=___ in url
    path("rentalDetails/", views.getUserRentals),  # Gets all rentals associated with a user, use ?account_id=___ in url
    path("createAppointment/", views.createRental), # Creates a rental using a user's cart, use ?account_id=___ in url
    path("rentalCancel/", views.cancel_rental),
    path("get-all-rentals/", views.get_all_rentals), # Gets all rentals with their respective account info and list of items, no params needed
    path("change-inventory-quantity/", views.change_inventory_quantity), # Changes the inventory quantity of given item, QUERY PARAMS: item_id, new_quantity
    path("get-item-units/", views.get_item_units_for_item), #Get all units of a given item, QUERY PARAMS: item_id
    path("get-all-items-admin/", views.get_all_items_admin), #For admin usage - get list of all items with their info and quantity in inventory, no params needed
    path("confirm-pickup/", views.confirm_rental_pickup), # DONE Confirms rental pickup, QUERY PARAMS: rental_id
    path("confirm-return/", views.confirm_rental_return), # DONE Confirms rental return, QUERY PARAMS: rental_id
    path("update-balance/", views.update_account_balance), # DONE Updates account balance, QUERY PARAMS: account_id, new_balance
    path("create-new-item/", views.create_new_item), # DONE Creates a new item and item units, QUERY PARAMS: item_name, item_description, item_category, item_quantity
    path("change-item-status/", views.mark_item_unit_as_damaged), # Marks specified item_unit_id as "damaged"
    path("change-account-status/", views.change_account_status), # Marks specified account as 1 which is "hold"
    path("get-all-accounts/", views.get_all_accounts) # Gets info of all accounts in the DB, excludign the username,password, and admin/student status, no params needed
]
