from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import University_Serializer
from .models import University

class Get_Universities_ViewSet (viewsets.GenericViewSet):
    queryset = University.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = University_Serializer

    def get_queryset (self, **kwargs):
        return University.objects.all()

    def list (self, request, *args, **kwargs):
        return Response ({
            "data": University_Serializer(self.queryset, many=True).data
        })