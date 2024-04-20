from django.urls import path
from . import views

urlpatterns = [
    #urls for testing
    path("login/", views.login), # Logs in user, use ?username=____ in url.  ENSURE PASSWORD IS IN request.POST
    path("accountInfo/", views.getAccountDetails), # Gets account info, use ?account_id=___ in url
    path("rentalDetails/", views.getUserRentals),  # Gets all rentals associated with a user, use ?account_id=___ in url
    path("createAppointment/", views.createRental), # Creates a rental using a user's cart, use ?account_id=___ in url
]
