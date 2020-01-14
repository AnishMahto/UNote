from rest_framework import serializers
from .models import Program

class Program_Serializer (serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'