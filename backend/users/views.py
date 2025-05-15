from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

# -------------------
# SIGNUP
# -------------------
@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({'error': 'All fields are mandatory'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({'message': f'Account {user.username} created!'}, status=status.HTTP_201_CREATED)

# -------------------
# LOGIN
# -------------------
@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return Response({'message': 'Login successful'})
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

# -------------------
# LOGOUT
# -------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logged out successfully'})

# -------------------
# CSRF COOKIE (necessário para frontend com SessionAuthentication)
# -------------------
@api_view(['GET'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def csrf(request):
    return Response({'message': 'CSRF cookie set'})

# -------------------
# USER VIEW (este é o mais importante)
# Protege esta rota — é aqui que AuthContext vai confirmar login
# -------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    return Response({
        'id': request.user.id,
        'username': request.user.username,
        'email': request.user.email,
        'is_admin': request.user.is_staff,
    })

# -------------------
# INFO EXTRA (opcional)
# -------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    user = request.user
    grupos = user.groups.values_list('name', flat=True)
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'grupos': list(grupos),
    })
