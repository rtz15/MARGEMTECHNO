from django.shortcuts import render
from rest_framework import status
from django.db.models import Q
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Post, Comentario, Evento, Like, Compra, Produto, Entrega
from .serializers import PostSerializer, ComentarioSerializer, EventoSerializer, LikeSerializer, CompraSerializer, ProdutoSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.

from django.http import JsonResponse

@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def posts(request):
    if request.method == 'GET':
        lista = Post.objects.all()
        serializer = PostSerializer(lista, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(autor=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        post_id = request.data.get('id')
        if not post_id:
            return Response({'detail': 'É necessário fornecer o ID do post a eliminar.'}, status=400)

        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({'detail': 'Post não encontrado.'}, status=404)

        if post.autor != request.user and not request.user.groups.filter(name='Admin').exists():
            return Response({'detail': 'Sem permissão para apagar este post.'}, status=403)

        post.delete()
        return Response({'detail': 'Post apagado com sucesso.'}, status=204)

    elif request.method == 'PUT':
        post_id = request.data.get('id')
        if not post_id:
            return Response({'detail': 'É necessário fornecer o ID do post a editar.'}, status=400)

        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({'detail': 'Post não encontrado.'}, status=404)

        if post.autor != request.user and not request.user.groups.filter(name='Admin').exists():
            return Response({'detail': 'Sem permissão para editar este post.'}, status=403)

        serializer = PostSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'POST', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])  # ← agora exige autenticação
def comentarios(request):
    if request.method == 'GET':
        lista = Comentario.objects.all()
        serializer = ComentarioSerializer(lista, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ComentarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(autor=request.user)  # ← atribui o utilizador autenticado
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        comentario_id = request.data.get('id')
        if not comentario_id:
            return Response({'detail': 'É necessário fornecer o ID do comentário a eliminar.'}, status=400)

        try:
            comentario = Comentario.objects.get(id=comentario_id)
        except Comentario.DoesNotExist:
            return Response({'detail': 'Comentário não encontrado.'}, status=404)

        e_autor_do_comentario = comentario.autor == request.user
        e_autor_do_post = comentario.post.autor == request.user
        e_admin = request.user.groups.filter(name='Admin').exists()

        if not (e_autor_do_comentario or e_autor_do_post or e_admin):
            return Response({'detail': 'Sem permissão para apagar este comentário.'}, status=403)

        comentario.delete()
        return Response({'detail': 'Comentário apagado com sucesso.'}, status=204)

    elif request.method == 'PUT':
        comentario_id = request.data.get('id')
        if not comentario_id:
            return Response({'detail': 'É necessário fornecer o ID do comentário a editar.'}, status=400)

        try:
            comentario = Comentario.objects.get(id=comentario_id)
        except Comentario.DoesNotExist:
            return Response({'detail': 'Comentário não encontrado.'}, status=404)

        if comentario.autor != request.user:
            return Response({'detail': 'Sem permissão para editar este comentário.'}, status=403)

        serializer = ComentarioSerializer(comentario, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
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

@api_view(['POST'])
def likes(request):
    post_id = request.data.get('post')

    if not post_id:
        return Response({'detail': 'É necessário fornecer o ID do post.'}, status=400)

    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'detail': 'Post não encontrado.'}, status=404)

    # Verificar se o like já existe
    like_existente = Like.objects.filter(post=post, utilizador=request.user).first()

    if like_existente:
        like_existente.delete()
        return Response({'detail': 'Like removido.'}, status=204)
    else:
        Like.objects.create(post=post, utilizador=request.user)
        return Response({'detail': 'Like adicionado.'}, status=201)

@api_view(['GET', 'POST'])
def compras(request):
    if request.method == 'GET':
        lista = Compra.objects.all()
        serializer = CompraSerializer(lista, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CompraSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(utilizador=request.user)  # <-- E aqui para compras
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
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
@permission_classes([AllowAny])
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
         'link': e['link']
    } for e in eventos_serialized]

    produtos_final = [{
        'id': p['id'],
        'tipo': 'produto',
        'titulo': p['nome'],
        'descricao': p['descricao'],
        'imagem': p['imagem'],
        'link': '/shop'
    } for p in produtos_serialized]

    resultados = eventos_final + produtos_final

    return Response(resultados)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_likes(request):
    user = request.user
    likes = Like.objects.filter(utilizador=user).values_list('post_id', flat=True)
    return Response(list(likes))

@api_view(['POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def toggle_like(request, post_id):
    user = request.user
    try:
        like = Like.objects.get(utilizador=user, post_id=post_id)
        like.delete()
        return Response({'liked': False})
    except Like.DoesNotExist:
        Like.objects.create(utilizador=user, post_id=post_id)
        return Response({'liked': True})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def like_count_view(request, post_id):
    user = request.user
    total_likes = Like.objects.filter(post_id=post_id).count()
    user_liked = Like.objects.filter(post_id=post_id, utilizador=user).exists()
    return Response({'count': total_likes, 'user_liked': user_liked})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)

        if post.autor != request.user and not request.user.is_staff:
            return Response({'detail': 'Sem permissão para apagar este post.'}, status=403)

        post.delete()
        return Response({'detail': 'Post excluído com sucesso.'}, status=204)

    except Post.DoesNotExist:
        return Response({'detail': 'Post não encontrado.'}, status=404)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def checkout(request):
    user = request.user
    compras_data = request.data.get('compras', [])
    entrega_data = request.data.get('entrega', {})

    if not compras_data:
        return Response({'error': 'Carrinho vazio.'}, status=status.HTTP_400_BAD_REQUEST)

    # Criar registo de entrega
    entrega = Entrega.objects.create(
        utilizador=user,
        nome=entrega_data.get('fullName'),
        email=entrega_data.get('email'),
        telefone=entrega_data.get('phone'),
        morada=entrega_data.get('address'),
        cidade=entrega_data.get('city'),
        codigo_postal=entrega_data.get('zipCode'),
        metodo_pagamento=entrega_data.get('paymentMethod')
    )

    compras_registadas = []

    for item in compras_data:
        produto_id = item.get('produto_id')
        preco = item.get('preco')
        quantidade = item.get('quantidade', 1)
        data = item.get('data')

        try:
            produto = Produto.objects.get(id=produto_id)

            if produto.stock < quantidade:
                return Response({'error': f'Sem stock suficiente para {produto.nome}.'}, status=400)

            produto.stock -= quantidade
            produto.save()

            compra = Compra.objects.create(
                utilizador=user,
                produto=produto,
                preco=preco,
                data=data,
                quantidade=quantidade
            )
            compras_registadas.append(CompraSerializer(compra).data)

        except Produto.DoesNotExist:
            return Response({'error': f'Produto {produto_id} não existe.'}, status=404)

    return Response({'compras': compras_registadas}, status=201)
