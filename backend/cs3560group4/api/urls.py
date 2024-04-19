from rest_framework.routers import DefaultRouter
from inventory_rental_cs.api.urls import post_router
from django.urls import path, include

router = DefaultRouter()

router.registry.extend(post_router.registry)

urlpatterns = [path("", include(router.urls))]