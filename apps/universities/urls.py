from .api import Get_Universities_ViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('api/get_universities', Get_Universities_ViewSet, 'get_universities')

urlpatterns = router.urls