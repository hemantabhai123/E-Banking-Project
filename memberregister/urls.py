
from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.memberCreate, name='member_create'),
]
