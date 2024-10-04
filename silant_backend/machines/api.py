from django.contrib.auth import get_user_model
from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from machines.models import Machine, Maintenance, Reclamation, Catalog
from machines.permissions import (
    UnauthenticatedOnly,
    IsManager,
    IsMaintenanceOwnerOrManager,
    HasMachineOrManager,
    IsServiceOrManagerOrReadOnly
)
from machines.serializers import (
    ShortMachineSerializer,
    MachineListSerializer,
    MachineCreateSerializer,
    MaintenanceGetSerializer,
    MaintenanceCreateSerializer,
    ReclamationGetSerializer,
    ReclamationCreateSerializer,
    FullCatalogSerializer, MachineCatalogSerializer
)

User = get_user_model()


class MachineViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet
):
    queryset = Machine.objects.order_by('-shipment_date')
    serializer_class = MachineListSerializer
    lookup_url_kwarg = 'serial_number'
    lookup_field = 'serial_number'

    def get_permissions(self):
        if self.action == 'retrieve':
            permission_classes = [UnauthenticatedOnly]
        elif self.action in ('create', 'update', 'partial_update'):
            permission_classes = [IsManager]
        else:
            permission_classes = [IsAuthenticated]

        return [perm() for perm in permission_classes]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ShortMachineSerializer
        elif self.action == 'list':
            return super().get_serializer_class()
        elif self.action in ('create', 'update', 'partial_update'):
            return MachineCreateSerializer
        elif self.action == 'catalog':
            return MachineCatalogSerializer

        return super().get_serializer_class()

    def get_queryset(self):
        if self.action == 'retrieve':
            return super().get_queryset()
        elif self.action == 'list':
            user = self.request.user
            if user.role == User.CLIENT:
                return Machine.objects.filter(client=user).order_by('-shipment_date')
            elif user.role == User.SERVICE_ORGANIZATION:
                return Machine.objects.filter(service_company=user).order_by('-shipment_date')
        elif self.action == 'catalog':
            user = self.request.user
            if user.role == User.CLIENT:
                return Machine.objects.filter(client=user).order_by('-shipment_date')
            elif user.role == User.SERVICE_ORGANIZATION:
                return Machine.objects.filter(service_company=user).order_by('-shipment_date')
            elif user.role == User.MANAGER:
                return Machine.objects.filter(
                    client__isnull=False, service_company__isnull=False
                ).order_by('-shipment_date')

        return super().get_queryset()

    @action(detail=False, methods=['get'])
    def catalog(self, request):
        """
        Get list of machines to use as select choices.

        List depends on user's role.
        - For clients: all machines where client == current user
        - For service organizations: all machines where service_company == current user
        - For managers: all machines where client and service_company are not null

        Authenticated only.
        """
        catalog = self.get_queryset()
        serializer = self.get_serializer(catalog, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class MaintenanceViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet
):
    queryset = Maintenance.objects.order_by('-date')
    serializer_class = MaintenanceGetSerializer

    def get_permissions(self):
        if self.action in ('update', 'partial_update'):
            permission_classes = [IsMaintenanceOwnerOrManager]
        elif self.action == 'create':
            permission_classes = [HasMachineOrManager]
        else:
            permission_classes = [IsAuthenticated]

        return [perm() for perm in permission_classes]

    def get_queryset(self):
        user = self.request.user

        if user.role == User.CLIENT:
            return Maintenance.objects.filter(machine__client=user).order_by('-date')
        elif user.role == User.SERVICE_ORGANIZATION:
            return Maintenance.objects.filter(service_company=user).order_by('-date')
        elif user.role == User.MANAGER:
            return super().get_queryset()

    def get_serializer_class(self):
        if self.action in ('create', 'update', 'partial_update'):
            return MaintenanceCreateSerializer

        return super().get_serializer_class()


class ReclamationViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet
):
    queryset = Reclamation.objects.order_by('-failure_date')
    serializer_class = ReclamationGetSerializer
    permission_classes = [IsServiceOrManagerOrReadOnly]

    def get_serializer_class(self):
        if self.action in ('create', 'update', 'partial_update'):
            return ReclamationCreateSerializer

        return super().get_serializer_class()

    def get_queryset(self):
        user = self.request.user

        if user.role == User.CLIENT:
            return Reclamation.objects.filter(machine__client=user).order_by('-failure_date')
        elif user.role == User.SERVICE_ORGANIZATION:
            return Reclamation.objects.filter(service_company=user).order_by('-failure_date')

        return super().get_queryset()


class CatalogViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet
):
    queryset = Catalog.objects.all().order_by('entity')
    serializer_class = FullCatalogSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsManager]

        return [perm() for perm in permission_classes]

    def get_queryset(self):
        if self.action == 'list':
            queryset = Catalog.objects.all().order_by('entity')

            request_entities = self.request.query_params.getlist('entity')

            if request_entities:
                available_entities = set(Catalog.ENTITY_CHOICES.keys())
                entities_list = [p.upper() for p in request_entities if p.upper() in available_entities]

                queryset = queryset.filter(entity__in=entities_list)

            return queryset

        return super().get_queryset()
