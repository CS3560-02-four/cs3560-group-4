from django.urls import path
from . import views

urlpatterns = [
    #urls for testing
    path("laptops/", views.test_laptops),
    path("calculators/", views.test_calculators),
    path("headsets/", views.test_headsets),
    path("mice/", views.test_mice),
    path("chargers/", views.test_chargers),
    path("allitems/", views.test2),
    path("insertcartitem/", views.test3),
    path("cartiteminfo/", views.test4),
    path("insertitem/", views.test5),
    path("rentalUpdate/", views.test6),
    path("rentalCancel/", views.cancel_rental),
    path("rentalItemInsert/", views.test8),
    path("rentalItemUpdate/", views.test9),
    path("rentalItemDelete/", views.test10),

    path("getRental/", views.test13),
    path("exampleJson/", views.test_json) #USE THIS FOR THE EXAMPLE JSON METHOD  
    
    # Possibly implement to search by id ?
    # path("single_item/", views.search_item),

]
