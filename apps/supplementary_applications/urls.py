from rest_framework import routers
from .api import Supplementary_Applications_ViewSet, User_Created_Supplementary_Applications_ViewSet, Upvote_Supplementary_Application, Downvote_Supplementary_Application, Get_Tags_ViewSet

# from .api import Test_ViewSet

router = routers.DefaultRouter()
# router.register('api/supplementary_applications', Supplementary_Applications_ViewSet, 'supplementary_applications')
router.register('api/supplementary_applications/upvote', Upvote_Supplementary_Application, 'supplementary_applications/upvote')
router.register('api/supplementary_applications/downvote', Downvote_Supplementary_Application, 'supplementary_applications/downvote')
router.register('api/my_supplementary_applications', User_Created_Supplementary_Applications_ViewSet, 'my_supplementary_applications')
router.register(r'api\/supplementary_applications\/(?P<pk1>\d{1,})\/(?P<pk2>\d{1,})', Supplementary_Applications_ViewSet, 'supplementary_applications')
router.register(r'api\/supplementary_applications\/(?P<pk1>\d{1,})', Supplementary_Applications_ViewSet, 'supplementary_applications')
router.register('api/get_tags', Get_Tags_ViewSet, 'get_tags')

urlpatterns = router.urls