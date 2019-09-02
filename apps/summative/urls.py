from rest_framework import routers
from .api import SummativeViewSet

router = routers.DefaultRouter()
router.register('api/summatives', SummativeViewSet, 'summatives')

urlpatterns = router.urls
