from django.contrib.auth import get_user_model
from rest_framework import permissions

User = get_user_model()


class UnauthenticatedOnly(permissions.BasePermission):
    """
    Allow access for unauthenticated users only
    """

    def has_permission(self, request, view):
        return not request.user.is_authenticated


class IsManager(permissions.BasePermission):
    """
    Allow access for managers only
    """

    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and user.role == User.MANAGER


class IsMaintenanceOwnerOrManager(permissions.BasePermission):
    """
    Allow write access for users that carried out maintenance or managers.

    If maintenance_carry_out is None, then it means that client carried out maintenance by himself.
    If maintenance_carry_out is not None, then it means that maintenance was carried out by service organization.
    """

    def has_object_permission(self, request, view, obj):
        user = request.user

        if user.role == User.MANAGER:
            return True

        if user.role == User.CLIENT \
                and obj.maintenance_carry_out is None \
                and obj.machine.pk in user.machines_as_client.values_list('pk', flat=True):
            return True

        if user.role == User.SERVICE_ORGANIZATION and obj.maintenance_carry_out == user:
            return True

        return False


class HasMachineOrManager(permissions.BasePermission):
    """
    Allow creation of maintenance only to users who own the machine or managers.

    For clients: checks if machine.client is current user.
    For service organizations: checks if machine.service_company is current user.
    """
    def has_permission(self, request, view):
        user = request.user
        machine = int(request.data.get('machine'))

        if user.role == User.MANAGER:
            return True

        if user.role == User.CLIENT:
            return machine in user.machines_as_client.values_list('pk', flat=True)

        if user.role == User.SERVICE_ORGANIZATION:
            return machine in user.machines_as_service.values_list('pk', flat=True)

        return False


class IsServiceOrManagerOrReadOnly(permissions.BasePermission):
    """
    Allow write access for service organizations or managers.
    Allow read access for authenticated users.
    """

    def has_permission(self, request, view):
        user = request.user

        if request.method in permissions.SAFE_METHODS:
            return user.is_authenticated

        return user.is_authenticated and (user.role == User.SERVICE_ORGANIZATION or user.role == User.MANAGER)
