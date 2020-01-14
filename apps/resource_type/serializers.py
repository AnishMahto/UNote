from .models import ResourceType
from rest_framework import serializers

class ResourceTypeSerializer (serializers.ModelSerializer):
    class Meta:
        model = ResourceType
        fields = '__all__'