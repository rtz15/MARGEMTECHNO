from django.urls import path, include
from . import views
from .views import user_likes, toggle_like

urlpatterns = [
    path('posts/', views.posts, name='posts'),
    path('comentarios/', views.comentarios, name='comentarios'),
    path('eventos/', views.eventos),
    path('likes/', views.likes, name='likes'),
    path('compras/', views.compras),
    path('produtos/', views.produtos),
    path('search/', views.search_all),
    path('api/search/', views.search_all, name='search-all'),
    path('checkout/', views.checkout, name='checkout'),
    path('likes/user/', user_likes),
    path('likes/toggle/<int:post_id>/', toggle_like),
    path('likes/count/<int:post_id>/', views.like_count_view),
    path('posts/delete/<int:post_id>/', views.delete_post, name='delete-post'),
]