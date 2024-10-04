from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    CLIENT = 'C'
    SERVICE_ORGANIZATION = 'S'
    MANAGER = 'M'
    ROLE_CHOICES = {
        CLIENT: 'Client',
        SERVICE_ORGANIZATION: 'Service Organization',
        MANAGER: 'Manager'
    }
    role = models.CharField(max_length=1, choices=ROLE_CHOICES, default=MANAGER, verbose_name='Роль')
    org_name = models.CharField(max_length=256, verbose_name='Название организации')

    def __repr__(self):
        return f'{self.get_role_display()}: {self.org_name}'

    def __str__(self):
        return f'{self.get_role_display()}: {self.org_name}'
