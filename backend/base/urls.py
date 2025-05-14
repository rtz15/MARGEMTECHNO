from django.urls import path, include
from . import views

urlpatterns = [
    path('posts/', views.posts, name='posts'),
    path('comentarios/', views.comentarios, name='comentarios'),
    path('eventos/', views.eventos),
    path('likes/', views.likes, name='likes'),
    path('compras/', views.compras),
    path('produtos/', views.produtos),
    path('search/', views.search_all),
    path('api/search/', views.search_all, name='search-all'),
]