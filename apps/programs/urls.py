from .api import Get_Programs_ViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('api/get_programs', Get_Programs_ViewSet, 'get_programs')

urlpatterns = router.urls