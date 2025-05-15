from django.urls import path
from .views import signup, login_view, logout_view, user_info, user_view, csrf

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('info/', user_info, name='user_info'),
    path('me/', user_view, name='user_view'),
    path('csrf/', csrf, name='csrf'),
]
