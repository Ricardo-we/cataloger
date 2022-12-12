from django.urls import path
from .views import get_helpers

urlpatterns = [
    path('helpers/', get_helpers, name="Helpers")
]
