from django.urls import path
from . import views

urlpatterns = [
    #urls for testing
    path("getcartitems/", views.get_available_items),
    path("exampleJson/", views.test_json) #USE THIS FOR THE EXAMPLE JSON METHOD
]
