from django.urls import path
from .views import signup, login_view, logout_view, user_view

urlpatterns = [
    path('signup/', signup),
    path('login/', login_view),
    path('logout/', logout_view),
    path('user/', user_view),
]