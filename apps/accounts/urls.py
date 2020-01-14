from django.urls import path, include
from .api import RegistrationAPI, LoginApi, UserApi, Leaderboard_ViewSet, Get_Global_Rank_ViewSet, Get_Total_Contributions_ViewSet, Get_Net_Upvotes_ViewSet
from knox import views as knox_views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('api/leaderboard', Leaderboard_ViewSet, 'leaderboard')
router.register('api/my_global_rank', Get_Global_Rank_ViewSet, 'my_global_rank')
router.register('api/my_total_contributions', Get_Total_Contributions_ViewSet, 'my_total_contributions')
router.register('api/my_net_upvotes', Get_Net_Upvotes_ViewSet, 'my_net_upvotes')

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegistrationAPI.as_view()),
    path('api/auth/login', LoginApi.as_view()),
    path('api/auth/user', UserApi.as_view()),
    path('api/auth/logout', knox_views.LoginView.as_view(), name='knox_logout')
] + router.urls