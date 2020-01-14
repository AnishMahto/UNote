from .serializers import ResourceTypeSerializer
from .models import ResourceType

from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response

class Resource_Type_ViewSet (viewsets.GenericViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ResourceTypeSerializer

    def list (self, request, *args, **kwargs):
        queryset = ResourceType.objects.all()
        return Response ({
            "data": ResourceTypeSerializer(queryset, many=True).data
        })