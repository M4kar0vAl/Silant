from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Catalog(models.Model):
    EQUIPMENT_MODEL = 'EQ_M'
    ENGINE_MODEL = 'EN_M'
    TRANSMISSION_MODEL = 'TR_M'
    DRIVE_AXLE_MODEL = 'DA_M'
    CONTROLLED_BRIDGE_MODEL = 'CB_M'
    MAINTENANCE_TYPE = 'MN_T'
    FAILURE_NODE = 'FAIL'
    RECOVERY_METHOD = 'RE_M'
    ENTITY_CHOICES = {
        EQUIPMENT_MODEL: 'Equipment model',
        ENGINE_MODEL: 'Engine model',
        TRANSMISSION_MODEL: 'Transmission model',
        DRIVE_AXLE_MODEL: 'Drive axle model',
        CONTROLLED_BRIDGE_MODEL: 'Controlled bridge model',
        MAINTENANCE_TYPE: 'Maintenance type',
        FAILURE_NODE: 'Failure node',
        RECOVERY_METHOD: 'Recovery method',
    }
    entity = models.CharField(max_length=4, choices=ENTITY_CHOICES)
    name = models.CharField(max_length=128, verbose_name='Название')
    description = models.CharField(max_length=256, verbose_name='Описание')

    def __repr__(self):
        return f'{self.name}: {self.get_entity_display()}'

    def __str__(self):
        return f'{self.name}'


class Machine(models.Model):
    serial_number = models.CharField(max_length=128, unique=True, verbose_name='Заводской номер')
    equipment_model = models.ForeignKey(
        Catalog,
        on_delete=models.PROTECT,
        limit_choices_to={'entity': Catalog.EQUIPMENT_MODEL},
        related_name='equipment_machines',
        verbose_name='Модель техники')
    engine_model = models.ForeignKey(
        Catalog,
        on_delete=models.PROTECT,
        limit_choices_to={'entity': Catalog.ENGINE_MODEL},
        related_name='engine_machines',
        verbose_name='Модель двигателя'
    )
    engine_serial_number = models.CharField(max_length=128, verbose_name='Заводской номер двигателя')
    transmission_model = models.ForeignKey(
        Catalog,
        on_delete=models.PROTECT,
        limit_choices_to={'entity': Catalog.TRANSMISSION_MODEL},
        related_name='transmission_machines',
        verbose_name='Модель трансмиссии'
    )
    transmission_serial_number = models.CharField(max_length=128, verbose_name='Заводской номер трансмиссии')
    drive_axle_model = models.ForeignKey(
        Catalog,
        on_delete=models.PROTECT,
        limit_choices_to={'entity': Catalog.DRIVE_AXLE_MODEL},
        related_name='drive_axle_machines',
        verbose_name='Модель ведущего моста'
    )
    drive_axle_serial_number = models.CharField(max_length=128, verbose_name='Заводской номер ведущего моста')
    controlled_bridge_model = models.ForeignKey(
        Catalog,
        on_delete=models.PROTECT,
        limit_choices_to={'entity': Catalog.CONTROLLED_BRIDGE_MODEL},
        related_name='controlled_bridge_machines',
        verbose_name='Модель управляемого моста'
    )
    controlled_bridge_serial_number = models.CharField(
        max_length=128, verbose_name='Заводской номер управляемого моста'
    )
    supply_contract_number_date = models.CharField(
        max_length=128, blank=True, null=True, verbose_name='Договор поставки номер, дата'
    )
    shipment_date = models.DateField(blank=True, null=True, verbose_name='Дата отгрузки с завода')
    consignee = models.CharField(max_length=256, blank=True, null=True, verbose_name='Грузополучатель')
    delivery_address = models.CharField(max_length=256, blank=True, null=True, verbose_name='Адрес поставки')
    additional_equipment = models.TextField(blank=True, null=True, verbose_name='Комплектация (доп. опции)')
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        limit_choices_to={'role': User.CLIENT},
        related_name='machines_as_client',
        blank=True,
        null=True,
        verbose_name='Клиент'
    )
    service_company = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        limit_choices_to={'role': User.SERVICE_ORGANIZATION},
        related_name='machines_as_service',
        blank=True,
        null=True,
        verbose_name='Сервисная компания'
    )

    def __repr__(self):
        return f'Machine: {self.serial_number}'

    def __str__(self):
        return f'Machine: {self.serial_number}'


class Maintenance(models.Model):
    type = models.ForeignKey(
        Catalog,
        on_delete=models.PROTECT,
        limit_choices_to={'entity': Catalog.MAINTENANCE_TYPE},
        related_name='type_maintenance',
        verbose_name='Вид ТО')
    date = models.DateField(verbose_name='Дата ТО')
    production = models.IntegerField(verbose_name='Наработка м/час')
    work_order_number = models.CharField(max_length=128, verbose_name='Номер заказ-наряда')
    work_order_date = models.DateField(verbose_name='Дата заказ-наряда')
    maintenance_carry_out = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        limit_choices_to={'role': User.SERVICE_ORGANIZATION},
        related_name='maintenance_as_carry_out',
        blank=True,
        null=True,
        verbose_name='Организация, проводившая ТО'
    )
    machine = models.ForeignKey(Machine, on_delete=models.PROTECT, related_name='maintenance', verbose_name='Машина')
    service_company = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        limit_choices_to={'role': User.SERVICE_ORGANIZATION},
        blank=True,
        related_name='maintenance_as_company',
        verbose_name='Сервисная компания'
    )

    def __repr__(self):
        return f'Maintenance: {self.pk}'

    def __str__(self):
        return f'Maintenance: {self.pk}'


class Reclamation(models.Model):
    failure_date = models.DateField(verbose_name='Дата отказа')
    production = models.IntegerField(verbose_name='Наработка м/час')
    failure_node = models.ForeignKey(
        Catalog,
        on_delete=models.PROTECT,
        limit_choices_to={'entity': Catalog.FAILURE_NODE},
        related_name='reclamation_failure_node',
        verbose_name='Узел отказа'
    )
    failure_description = models.CharField(max_length=256, verbose_name='Описание отказа')
    recovery_method = models.ForeignKey(
        Catalog,
        on_delete=models.PROTECT,
        limit_choices_to={'entity': Catalog.RECOVERY_METHOD},
        related_name='reclamation_recovery_method',
        verbose_name='Способ восстановления'
    )
    spare_parts = models.CharField(max_length=256, blank=True, verbose_name='Запасные части')
    recovery_date = models.DateField(verbose_name='Дата восстановления')
    downtime = models.IntegerField(verbose_name='Время простоя')
    machine = models.ForeignKey(
        Machine,
        on_delete=models.PROTECT,
        related_name='reclamations',
        verbose_name='Машина'
    )
    service_company = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        limit_choices_to={'role': User.SERVICE_ORGANIZATION},
        blank=True,
        related_name='reclamations',
        verbose_name='Сервисная компания'
    )

    def __repr__(self):
        return f'Reclamation: {self.pk}'

    def __str__(self):
        return f'Reclamation: {self.pk}'
