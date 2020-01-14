from .api import Create_Resource_Item_ViewSet, View_Resource_Item_ViewSet, User_Created_Resource_Item_ViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('api/resource_items', Create_Resource_Item_ViewSet, 'resources_items')
router.register('api/my_resource_items', User_Created_Resource_Item_ViewSet, 'resource_items')
router.register(r'api\/resource_items\/(?P<pk1>\d{1,})\/(?P<pk2>\d{1,})', View_Resource_Item_ViewSet, 'resources_items')
router.register(r'api\/resource_items\/(?P<pk1>\d{1,})', View_Resource_Item_ViewSet, 'resources_items')

urlpatterns = router.urls