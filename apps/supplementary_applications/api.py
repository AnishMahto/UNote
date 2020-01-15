from .models import SupplementaryApplication
from ..general.post_tags import GET_TAGS_DATA
from ..universities.models import University
from ..programs.models import Program

from rest_framework import viewsets, permissions, mixins
from rest_framework.exceptions import PermissionDenied, APIException
from rest_framework.response import Response

from .serializers import Supplementary_Application_Serializer

from django.shortcuts import get_object_or_404

import os
from urllib.parse import urlsplit
import requests
import favicon
from PIL import Image

class Upvote_Supplementary_Application(viewsets.ModelViewSet):
    queryset = SupplementaryApplication.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = Supplementary_Application_Serializer

    def partial_update (self, instance, pk):

        user = self.request.user
        supp_app = SupplementaryApplication.objects.get(id=pk)
        
        original_net_upvotes = supp_app.net_upvotes

        # if user previously downvoted this post, remove the downvote
        if (user.downvoters.all().filter(id=pk).count() == 1):
            supp_app.downvoters.remove(user)
            supp_app.net_upvotes += 1
            supp_app.save()

        # if user has not already upvoted this post, add upvote
        if (user.upvoters.all().filter(id=pk).count() == 0):
            supp_app.upvoters.add(user)
            supp_app.net_upvotes += 1
            supp_app.save()
        else:
            # if user has already upvoted this post, remove upvote
            supp_app.upvoters.remove(user)
            supp_app.net_upvotes -= 1
            supp_app.save()
        
        supp_app.owner.user_profile.net_upvotes += supp_app.net_upvotes - original_net_upvotes
        supp_app.owner.user_profile.save()

        return Response ({
            "data": Supplementary_Application_Serializer(supp_app).data
        })

class Downvote_Supplementary_Application(viewsets.ModelViewSet):
    queryset = SupplementaryApplication.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = Supplementary_Application_Serializer

    def partial_update (self, instance, pk):

        user = self.request.user
        supp_app = SupplementaryApplication.objects.get(id=pk)

        original_net_upvotes = supp_app.net_upvotes

        # if user previously upvoted this post, remove the upvote
        if (user.upvoters.all().filter(id=pk).count() == 1):
            supp_app.upvoters.remove(user)
            supp_app.net_upvotes -= 1
            supp_app.save()

        # if user has not already downvoted this post, add downvote
        if (user.downvoters.all().filter(id=pk).count() == 0):
            supp_app.downvoters.add(user)
            supp_app.net_upvotes -= 1
            supp_app.save()
        else:
            # if user has already downvoted this post, remove downvote
            supp_app.downvoters.remove(user)
            supp_app.net_upvotes += 1
            supp_app.save()

        supp_app.owner.user_profile.net_upvotes += supp_app.net_upvotes - original_net_upvotes
        supp_app.owner.user_profile.save()

        return Response ({
            "data": Supplementary_Application_Serializer(supp_app).data
        })

class User_Created_Supplementary_Applications_ViewSet(viewsets.GenericViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    
    serializer_class = Supplementary_Application_Serializer
    
    def list (self, request, *args, **kwargs):
        user = self.request.user
        queryset = user.supplementary_applications.all()

        return Response({
            "data": Supplementary_Application_Serializer(queryset, many=True).data
        })


class Supplementary_Applications_ViewSet (viewsets.GenericViewSet, mixins.CreateModelMixin):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = SupplementaryApplication

    def list (self, request, *args, **kwargs):
        if ('pk2' in kwargs):
            organization_id = int(kwargs["pk1"])
            program_id = int(kwargs["pk2"])
            current_university = get_object_or_404(University, id=organization_id)
            current_program = get_object_or_404(Program, id=program_id)
            queryset = current_university.posts.filter(program=current_program)
        else:
            organization_id = int(kwargs["pk1"])
            current_university = get_object_or_404(University, id=organization_id)
            queryset = current_university.posts.all()
        return Response({
            "data": Supplementary_Application_Serializer(queryset, many=True).data
        })

    def create (self, request, *args, **kwargs):
        data = request.data
        data["owner"] = self.request.user.id
        data["net_upvotes"] = 0
        data["university"] = int(data["university"])
        data["program"] = int(data["program"])
        
        newSuppApp = Supplementary_Application_Serializer(data = data)
        
        if (newSuppApp.is_valid()):
            newSuppApp.save()
            self.request.user.user_profile.total_contributions += 1
            self.request.user.user_profile.save()
            return Response({"data":newSuppApp.data})
        else:
            raise APIException(newSuppApp.errors)

    def delete (self, request, *args, **kwargs):
        suppApp = get_object_or_404(SupplementaryApplication, id=int(kwargs["pk1"]))

        if (suppApp.owner == self.request.user):
            self.request.user.user_profile.total_contributions -= 1
            self.request.user.user_profile.save()
            suppApp.delete()
        else:
            raise PermissionDenied (detail="You do not own this post.")

        return Response({
            "data":[]
        })


class Get_Tags_ViewSet (viewsets.GenericViewSet):
    def list (self, response, *args, **kwargs):
        # BASE_DIR = os.path.dirname(os.path.dirname(__file__))
        # URL = "https://www.medium.com/lol/adfsdf/"
        # URL_SPLIT = urlsplit (URL)

        # try:
        #     os.mkdir(os.path.join(BASE_DIR, 'media', 'images', URL_SPLIT.netloc))
        # except:
        #     print ("folder exists")

        # # print (BASE_DIR)
        # icons = favicon.get('https://www.medium.com')
        # icon = icons[0]
        

        # response = requests.get(icon.url, stream=True)

        # # p = ImageFile.Parser()

        # with open(os.path.join (BASE_DIR, 'media', 'images', URL_SPLIT.netloc, 'python-favicon.{}'.format(icon.format)), 'wb') as image:
        #     for chunk in response.iter_content(1024):
        #         image.write(chunk)
        #         # p.feed(chunk)

        # image.close()
        print (GET_TAGS_DATA)

        return Response({
            "data": GET_TAGS_DATA
        })