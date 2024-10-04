from django.contrib.auth import get_user_model
from rest_framework import serializers

from accounts.serializers import GetUserSerializer
from machines.models import Machine, Maintenance, Reclamation, Catalog


User = get_user_model()


class ShortCatalogSerializer(serializers.ModelSerializer):
    """
    For unauthenticated "retrieve" action
    """
    class Meta:
        model = Catalog
        exclude = ['id', 'entity', 'description']


class CatalogSerializer(serializers.ModelSerializer):
    """
    For authenticated "list" action
    """
    class Meta:
        model = Catalog
        exclude = ['entity']


class FullCatalogSerializer(serializers.ModelSerializer):
    """
    For creating/updating instances of other models. Will be got as "list" and used as choices in select box.
    """
    class Meta:
        model = Catalog
        exclude = []


class ShortMachineSerializer(serializers.ModelSerializer):
    equipment_model = ShortCatalogSerializer()
    engine_model = ShortCatalogSerializer()
    transmission_model = ShortCatalogSerializer()
    drive_axle_model = ShortCatalogSerializer()
    controlled_bridge_model = ShortCatalogSerializer()

    class Meta:
        model = Machine
        exclude = [
            'id',
            'supply_contract_number_date',
            'shipment_date',
            'consignee',
            'delivery_address',
            'additional_equipment',
            'client',
            'service_company',
        ]


class MachineListSerializer(serializers.ModelSerializer):
    equipment_model = CatalogSerializer(read_only=True)
    engine_model = CatalogSerializer(read_only=True)
    transmission_model = CatalogSerializer(read_only=True)
    drive_axle_model = CatalogSerializer(read_only=True)
    controlled_bridge_model = CatalogSerializer(read_only=True)

    client = GetUserSerializer(read_only=True)
    service_company = GetUserSerializer(read_only=True)

    class Meta:
        model = Machine
        exclude = []


class MachineCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        exclude = []


class MachineCatalogSerializer(serializers.ModelSerializer):
    client = GetUserSerializer(read_only=True)

    class Meta:
        model = Machine
        fields = ['id', 'serial_number', 'client']


class MaintenanceGetSerializer(serializers.ModelSerializer):
    type = CatalogSerializer(read_only=True)
    maintenance_carry_out = GetUserSerializer(read_only=True)
    machine = MachineCatalogSerializer(read_only=True)
    service_company = GetUserSerializer(read_only=True)

    class Meta:
        model = Maintenance
        exclude = []


class MaintenanceCreateSerializer(serializers.ModelSerializer):
    service_company = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role=User.SERVICE_ORGANIZATION),
        required=False,
        allow_null=True,
        allow_empty=True
    )
    maintenance_carry_out = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role=User.SERVICE_ORGANIZATION),
        required=False,
        allow_null=True,
        allow_empty=True
    )

    class Meta:
        model = Maintenance
        exclude = []

    def create(self, validated_data):
        user = self.context['request'].user

        if user.role == User.MANAGER:
            # if user is manager, then create as it is
            # manager can set service company and maintenance_carry_out directly
            maintenance = Maintenance.objects.create(**validated_data)
        elif user.role == User.CLIENT:
            # if user is client, then get rid of maintenance_carry_out in request data and create with None
            # maintenance_carry_out == None means that client carried out maintenance by himself
            # service company is set to machine's service_company
            validated_data.pop('maintenance_carry_out')
            validated_data.pop('service_company', None)
            machine_service_company = validated_data.get('machine').service_company

            maintenance = Maintenance.objects.create(
                **validated_data, maintenance_carry_out=None, service_company=machine_service_company
            )
        elif user.role == User.SERVICE_ORGANIZATION:
            # if user is service organization, then get rid of maintenance_carry_out in request data
            # and create with current user
            # service company is set to machine's service company
            validated_data.pop('maintenance_carry_out')
            validated_data.pop('service_company', None)
            machine_service_company = validated_data.get('machine').service_company

            maintenance = Maintenance.objects.create(
                **validated_data, maintenance_carry_out=user, service_company=machine_service_company
            )

        return maintenance


class ReclamationGetSerializer(serializers.ModelSerializer):
    failure_node = CatalogSerializer(read_only=True)
    recovery_method = CatalogSerializer(read_only=True)
    machine = MachineListSerializer(read_only=True)
    service_company = GetUserSerializer(read_only=True)

    class Meta:
        model = Reclamation
        exclude = []


class ReclamationCreateSerializer(serializers.ModelSerializer):
    service_company = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role=User.SERVICE_ORGANIZATION),
        required=False,
        allow_null=True
    )

    class Meta:
        model = Reclamation
        exclude = []
        read_only_fields = ['downtime']

    def create(self, validated_data):
        user = self.context['request'].user

        recovery_date = validated_data.get('recovery_date')  # datetime.date obj
        failure_date = validated_data.get('failure_date')  # datetime.date obj

        downtime = (recovery_date - failure_date).days

        if user.role == User.SERVICE_ORGANIZATION:
            validated_data.pop('service_company', None)
            machine_service_company = validated_data.get('machine').service_company

            reclamation = Reclamation.objects.create(
                **validated_data, downtime=downtime, service_company=machine_service_company
            )
        elif user.role == User.MANAGER:
            reclamation = Reclamation.objects.create(**validated_data, downtime=downtime)

        return reclamation

    def update(self, instance, validated_data):
        recovery_date = validated_data.get('recovery_date', instance.recovery_date)  # datetime.date obj
        failure_date = validated_data.get('failure_date', instance.failure_date)  # datetime.date obj

        downtime = None

        # if one or both dates changed, then recalculate downtime
        if recovery_date != instance.recovery_date or failure_date != instance.failure_date:
            downtime = (recovery_date - failure_date).days

        for field in validated_data:
            setattr(instance, field, validated_data.get(field))

        if downtime is not None:
            instance.downtime = downtime

        instance.save()

        return instance
