from django.urls import path
from . import views

urlpatterns = [
    path("test_insert/", views.insertItem),
    path("allitems", views.getAllItems)
]
