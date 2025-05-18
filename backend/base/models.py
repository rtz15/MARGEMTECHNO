from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    autor = models.ForeignKey(User, on_delete=models.CASCADE)
    conteudo = models.TextField()
    imagem = models.ImageField(upload_to='posts/', blank=True, null=True)
    video = models.FileField(upload_to='videos/', blank=True, null=True)  # 👈 novo campo
    criado_em = models.DateTimeField(auto_now_add=True)

class Comentario(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comentarios")
    autor = models.ForeignKey(User, on_delete=models.CASCADE)
    conteudo = models.TextField()
    criado_em = models.DateTimeField(auto_now_add=True)

class Evento(models.Model):
    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    data = models.DateTimeField()
    imagem = models.ImageField(upload_to='eventos/', blank=True, null=True)
    participantes = models.ManyToManyField(User, related_name="eventos_registados", blank=True)
    link = models.URLField(max_length=500, blank=True)
    
    def __str__(self):
        return self.titulo

class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    utilizador = models.ForeignKey(User, on_delete=models.CASCADE)
    criado_em = models.DateTimeField(auto_now_add=True)

class Produto(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    preco = models.DecimalField(max_digits=8, decimal_places=2)
    imagem = models.ImageField(upload_to='produtos/')
    stock = models.IntegerField(default=0)
    

class Compra(models.Model):
    utilizador = models.ForeignKey(User, on_delete=models.CASCADE)
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    preco = models.DecimalField(max_digits=8, decimal_places=2)
    data = models.DateTimeField(auto_now_add=True)
    quantidade = models.IntegerField(default=1)

class Entrega(models.Model):
    utilizador = models.ForeignKey(User, on_delete=models.CASCADE)
    nome = models.CharField(max_length=100)
    email = models.EmailField()
    telefone = models.CharField(max_length=20)
    morada = models.CharField(max_length=200)
    cidade = models.CharField(max_length=100)
    codigo_postal = models.CharField(max_length=20)
    metodo_pagamento = models.CharField(max_length=50)
    data = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Entrega de {self.utilizador.username} em {self.morada}'