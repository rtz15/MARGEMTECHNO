from rest_framework import permissions

class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Permite acesso total ao autor do objeto ou a membros do grupo 'Admin'.
    """

    def has_object_permission(self, request, view, obj):
        # Se for leitura (GET, HEAD, OPTIONS), permite sempre
        if request.method in permissions.SAFE_METHODS:
            return True

        # Se for admin, permite
        if request.user.groups.filter(name='Admin').exists():
            return True

        # Se for o dono do objeto (ex: post.autor == request.user), permite
        return obj.autor == request.user or getattr(obj, 'utilizador', None) == request.user
