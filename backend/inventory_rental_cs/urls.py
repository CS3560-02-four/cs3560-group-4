from django.urls import path
from . import views

urlpatterns = [
    #urls for testing
    path("laptops/", views.test),
    path("allitems/", views.test2)
]
