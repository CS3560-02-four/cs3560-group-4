from django.urls import path
from . import views

urlpatterns = [
    path("rentalCancel/", views.cancel_rental),
]
