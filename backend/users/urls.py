from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import signup, user_info, CustomAuthToken

urlpatterns = [
    path('signup/', signup),
    path('login/', CustomAuthToken.as_view()),
    path('me/', user_info),
]