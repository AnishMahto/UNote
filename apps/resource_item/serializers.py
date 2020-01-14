from .models import ResourceItem
from rest_framework import serializers

class ResourceItemSerializer (serializers.ModelSerializer):
    class Meta:
        model = ResourceItem
        fields = '__all__'