from django.contrib import admin
from .models import Produto, Evento, Post, Comentario, Like, Compra

admin.site.register(Produto)
admin.site.register(Evento)
admin.site.register(Post)
admin.site.register(Comentario)
admin.site.register(Like)
admin.site.register(Compra)