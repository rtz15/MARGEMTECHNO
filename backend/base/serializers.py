from rest_framework import serializers
from .models import Post, Comentario, Evento, Like, Compra, Produto

class PostSerializer(serializers.ModelSerializer):
    autor = serializers.ReadOnlyField(source='autor.username')

    class Meta:
        model = Post
        fields = ['id', 'autor', 'conteudo', 'imagem', 'criado_em']

class ComentarioSerializer(serializers.ModelSerializer):
    autor = serializers.ReadOnlyField(source='autor.username')

    class Meta:
        model = Comentario
        fields = ['id', 'post', 'autor', 'texto', 'criado_em']

class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ['id', 'titulo', 'descricao', 'data', 'imagem', 'link']

class LikeSerializer(serializers.ModelSerializer):
    utilizador = serializers.ReadOnlyField(source='utilizador.username')

    class Meta:
        model = Like
        fields = ['id', 'post', 'utilizador', 'criado_em']

class CompraSerializer(serializers.ModelSerializer):
    utilizador = serializers.ReadOnlyField(source='utilizador.username')

    class Meta:
        model = Compra
        fields = ['id', 'utilizador', 'produto', 'preco', 'data']

class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'