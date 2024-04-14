from django.urls import path
from . import views

urlpatterns = [
    #urls for testing
    path("laptops/", views.test),
    path("allitems/", views.test2),
    path("insertcartitem/", views.test3),
    path("cartiteminfo/", views.test4)
]
