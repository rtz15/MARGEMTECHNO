from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Post, Comentario, Evento, Like, Compra
from .serializers import PostSerializer, ComentarioSerializer, EventoSerializer, LikeSerializer, CompraSerializer, ProdutoSerializer


# Create your views here.

from django.http import JsonResponse

def produtos_view(request):
    produtos = [
        {"id": 1, "nome": "Coluna JBL", "preco": 99.99},
        {"id": 2, "nome": "Mesa de mistura", "preco": 249.00}
    ]
    return JsonResponse(produtos, safe=False)

@api_view(['GET', 'POST'])
def posts(request):
    if request.method == 'GET':
        lista = Post.objects.all()
        serializer = PostSerializer(lista, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'POST'])
def comentarios(request):
    if request.method == 'GET':
        lista = Comentario.objects.all()
        serializer = ComentarioSerializer(lista, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ComentarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'POST'])
def eventos(request):
    if request.method == 'GET':
        lista = Evento.objects.all()
        serializer = EventoSerializer(lista, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = EventoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'POST'])
def likes(request):
    if request.method == 'GET':
        lista = Like.objects.all()
        serializer = LikeSerializer(lista, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = LikeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'POST'])
def compras(request):
    if request.method == 'GET':
        lista = Compra.objects.all()
        serializer = CompraSerializer(lista, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CompraSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
@api_view(['GET', 'POST'])
def produtos(request):
    if request.method == 'GET':
        lista = Produto.objects.all()
        serializer = ProdutoSerializer(lista, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ProdutoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)