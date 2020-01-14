from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import Program_Serializer
from .models import Program

class Get_Programs_ViewSet (viewsets.GenericViewSet):
    queryset = Program.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = Program_Serializer

    def list (self, request, *args, **kwargs):
        return Response ({
            "data": Program_Serializer(self.queryset, many=True).data
        })