from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, UserProfileSerializer
from .models import UserProfile
from rest_framework.exceptions import APIException

class RegistrationAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response ({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginApi(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response ({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class UserApi (generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer
    
    def get_object (self):
        return self.request.user

class Leaderboard_ViewSet (viewsets.GenericViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserProfileSerializer

    def list (self, request, *args, **kwargs):
        queryset = UserProfile.objects.all()
        return Response ({
            "data": UserProfileSerializer(queryset, many=True).data
        })

class Get_Global_Rank_ViewSet (viewsets.GenericViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserProfileSerializer

    def list (self, request, *args, **kwargs):
        queryset = UserProfile.objects.order_by('net_upvotes')
        rank = 0
        for profile in queryset:
            rank += 1
            if profile.username == self.request.user.username:
                return Response({
                    "data": rank
                })
        raise APIException ("User Not Found")
        
class Get_Total_Contributions_ViewSet (viewsets.GenericViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserProfileSerializer

    def list (self, request, *args, **kwargs):
        return Response ({
            "data": self.request.user.user_profile.total_contributions
        })

class Get_Net_Upvotes_ViewSet (viewsets.GenericViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserProfileSerializer

    def list (self, request, *args, **kwargs):
        return Response ({
            "data": self.request.user.user_profile.net_upvotes
        })
