from rest_framework import routers

from accounts.api import UserViewSet

router = routers.DefaultRouter()
router.register('user', UserViewSet, basename='user')

urlpatterns = []

urlpatterns += router.urls
