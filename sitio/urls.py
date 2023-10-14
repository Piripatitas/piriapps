from django.urls import path
from . import views

urlpatterns = [
   
path('', views.pantalla, name='pantalla'),



path('inicio/', views.inicio, name='inicio'),

path('otro/', views.vista_otro, name='vista_otro'),

path('perritos/', views.vista_perritos, name='vista_perritos'),

path('che/', views.che_yo, name='che_yo'),

path('gps/', views.gps, name='gps')


    
]


