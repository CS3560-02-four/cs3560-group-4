from django.urls import path
from . import views

urlpatterns = [
    #urls for testing
    path("laptops/", views.test),
    path("allitems/", views.test2),
    path("insertcartitem/", views.test3),
    path("cartiteminfo/", views.test4),
    path("rentalInsert/", views.test5),
    path("rentalUpdate/", views.test6),
    path("rentalDelete/", views.test7),
    path("rentalItemInsert/", views.test8),
    path("rentalItemUpdate/", views.test9),
    path("rentalItemDelete/", views.test10),
    path("getRental/", views.test13)

]
