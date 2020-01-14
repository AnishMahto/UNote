from rest_framework import serializers
from .models import University

class University_Serializer (serializers.ModelSerializer):
    class Meta:
        model = University
        fields = '__all__'