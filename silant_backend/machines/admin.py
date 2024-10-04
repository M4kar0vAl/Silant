from django.contrib import admin

from machines.models import Machine, Maintenance, Reclamation, Catalog

admin.site.register(Machine)
admin.site.register(Maintenance)
admin.site.register(Reclamation)
admin.site.register(Catalog)
