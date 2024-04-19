from django.urls import path
from . import views

urlpatterns = [
    #urls for testing
    path("login/<user>/<passw>/", views.login),
    path("accountInfo/<acc_id>/", views.getAccountDetails),
    path("rentalDetails/<acc_id>/", views.getUserRentals),
    path("appointmentCreate/<acc_id>/", views.createRental),
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
