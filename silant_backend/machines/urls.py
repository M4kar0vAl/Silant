from rest_framework import routers

from machines.api import MachineViewSet, MaintenanceViewSet, ReclamationViewSet, CatalogViewSet

router = routers.DefaultRouter()


router.register('machine', MachineViewSet, basename='machine')
router.register('maintenance', MaintenanceViewSet, basename='maintenance')
router.register('reclamation', ReclamationViewSet, basename='reclamation')
router.register('catalog', CatalogViewSet, basename='catalog')

urlpatterns = []

urlpatterns += router.urls
