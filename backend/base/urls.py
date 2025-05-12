from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.posts),
    path('comentarios/', views.comentarios),
    path('eventos/', views.eventos),
    path('likes/', views.likes),
    path('compras/', views.compras),
    path('produtos/', views.produtos),
    path('search/', views.search_all),
]