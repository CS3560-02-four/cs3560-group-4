from django.urls import path
from . import views

urlpatterns = [
    #urls for testing
    path("login/", views.login), # Logs in user, use ?username=____ in url.  ENSURE PASSWORD IS IN request.POST
    path("accountInfo/", views.getAccountDetails), # Gets account info, use ?account_id=___ in url
    path("rentalDetails/", views.getUserRentals),  # Gets all rentals associated with a user, use ?account_id=___ in url
    path("createAppointment/", views.createRental), # Creates a rental using a user's cart, use ?account_id=___ in url
    path("laptops/", views.test),
    path("allitems/", views.test2),
    path("insertcartitem/", views.test3),
    path("cartiteminfo/", views.test4),
    path("insertitem/", views.test5),
    path("rentalUpdate/", views.test6),
    path("rentalDelete/", views.test7),
    path("rentalItemInsert/", views.test8),
    path("rentalItemUpdate/<account_id>/", views.test9),
    path("rentalItemDelete/", views.test10),
    path("getRental/", views.test13),
    path("getRentalsJson/", views.test14),
    path("exampleJson/", views.test_json) #USE THIS FOR THE EXAMPLE JSON METHOD
]
