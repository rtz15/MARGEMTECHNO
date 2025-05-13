from django.shortcuts import render
from django.db.models import Q
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Post, Comentario, Evento, Like, Compra, Produto
from .serializers import PostSerializer, ComentarioSerializer, EventoSerializer, LikeSerializer, CompraSerializer, ProdutoSerializer


# Create your views here.

from django.http import JsonResponse

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
        agora = timezone.now()
        query = request.GET.get('q', '')  # Lê o parâmetro q da URL

        eventos = Evento.objects.filter(data__gte=agora)

        if query:
            eventos = eventos.filter(
                Q(titulo__icontains=query) | Q(descricao__icontains=query)
            )

        eventos = eventos.order_by('data')
        serializer = EventoSerializer(eventos, many=True)
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
    
@api_view(['GET'])
def search_all(request):
    query = request.GET.get('q', '')

    eventos = Evento.objects.filter(
        Q(titulo__icontains=query) | Q(descricao__icontains=query)
    )
    produtos = Produto.objects.filter(
        Q(nome__icontains=query) | Q(descricao__icontains=query)
    )

    eventos_serialized = EventoSerializer(eventos, many=True).data
    produtos_serialized = ProdutoSerializer(produtos, many=True).data

    eventos_final = [{
        'id': e['id'],
        'tipo': 'evento',
        'titulo': e['titulo'],
        'descricao': e['descricao'],
        'imagem': e['imagem'],
        'link': f"/eventos/{e['id']}"  # ou o link real do teu projeto
    } for e in eventos_serialized]

    produtos_final = [{
        'id': p['id'],
        'tipo': 'produto',
        'titulo': p['nome'],
        'descricao': p['descricao'],
        'imagem': p['imagem'],
        'link': f"/produtos/{p['id']}"  # ou o link real do teu projeto
    } for p in produtos_serialized]

    resultados = eventos_final + produtos_final

    return Response(resultados)
    