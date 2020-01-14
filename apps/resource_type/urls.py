from .api import Resource_Type_ViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('api/resource_types', Resource_Type_ViewSet, 'resource_types')

urlpatterns = router.urls