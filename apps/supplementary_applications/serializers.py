from rest_framework import serializers
from apps.supplementary_applications.models import SupplementaryApplication

class Supplementary_Application_Serializer(serializers.ModelSerializer):
    class Meta:
        model = SupplementaryApplication
        # fields = '__all__'
        # we want to exclude upvoters, downvoters, created_at
        fields = ('id', 'title', 'url', 'net_upvotes', 'description', 'created_at', 'year', 'university', 'owner', 'program', 'tag')