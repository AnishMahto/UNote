from rest_framework import viewsets
from .models import ResourceItem
from .serializers import ResourceItemSerializer

from ..universities.models import University
from ..programs.models import Program

from rest_framework.response import Response
from rest_framework import viewsets, permissions, mixins
from rest_framework.exceptions import PermissionDenied, APIException

from django.shortcuts import get_object_or_404
from django.conf import settings
from django.core.files import File
from django.core.files.storage import default_storage, FileSystemStorage
from django.core.files.temp import NamedTemporaryFile

import os
from urllib.parse import urlsplit
import requests
import favicon
from PIL import Image

class Create_Resource_Item_ViewSet (viewsets.GenericViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ResourceItemSerializer
    
    def create(self, request, *args, **kwargs):
        data = request.data
        data["owner"] = self.request.user.id
        data["university"] = int(data["university"])
        data["program"] = int(data["program"])
        
        URL = data["url"]
        URL_SPLIT = urlsplit (URL)

        data["url_base"] = URL_SPLIT.netloc

        newResource = ResourceItemSerializer(data = data)

        if (newResource.is_valid()):
            newResource.save()
            self.request.user.user_profile.total_contributions += 1
            self.request.user.user_profile.save()
            return Response({"data":newResource.data})
        else:
            raise APIException(newResource.errors)

class User_Created_Resource_Item_ViewSet(viewsets.GenericViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    
    serializer_class = ResourceItemSerializer
    
    def list (self, request, *args, **kwargs):
        user = self.request.user
        queryset = user.resource_items.all()
        return Response ({
            "data": ResourceItemSerializer(queryset, many=True).data
        })

class View_Resource_Item_ViewSet (viewsets.GenericViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ResourceItemSerializer

    def list (self, request, *args, **kwargs):
        if ('pk2' in kwargs):
            organization_id = int(kwargs["pk1"])
            program_id = int(kwargs["pk2"])
            current_university = get_object_or_404(University, id=organization_id)
            current_program = get_object_or_404(Program, id=program_id)
            queryset = current_university.resource_items.filter(program=current_program)
        else:
            organization_id = int(kwargs["pk1"])
            current_university = get_object_or_404(University, id=organization_id)
            queryset = current_university.resource_items.all()
        return Response({
            "data": ResourceItemSerializer(queryset, many=True).data
        })

    def delete (self, request, *args, **kwargs):
        resourceItem = get_object_or_404(ResourceItem, id=int(kwargs["pk1"]))

        if (resourceItem.owner == self.request.user):
            self.request.user.user_profile.total_contributions -= 1
            self.request.user.user_profile.save()
            resourceItem.delete()
        else:
            raise PermissionDenied (detail="You do not own this post.")

        return Response({
            "data":[]
        })