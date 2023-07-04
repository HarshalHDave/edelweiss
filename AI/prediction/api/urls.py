from django.urls import path

from .views import predict

urlpatterns = [
    path('predict/<str:symbol>', predict, name='predict'),
]