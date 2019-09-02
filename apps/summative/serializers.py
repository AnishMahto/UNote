from rest_framework import serializers
from apps.summative.models import Summative

class SummativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Summative
        fields = '__all__'
