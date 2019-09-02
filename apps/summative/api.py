from apps.summative.models import Summative
from rest_framework import viewsets, permissions
from .serializers import SummativeSerializer

class SummativeViewSet(viewsets.ModelViewSet):
    queryset = Summative.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SummativeSerializer
