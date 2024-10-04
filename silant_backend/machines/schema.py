from drf_spectacular.extensions import OpenApiViewExtension
from drf_spectacular.utils import extend_schema, OpenApiParameter

import machines.api


class Fix1(OpenApiViewExtension):
    target_class = machines.api.MachineViewSet

    def view_replacement(self):
        @extend_schema(tags=['Machines'])
        class Fixed(self.target_class):
            @extend_schema(
                description='Create machine.\n\n'
                            'Manager only.',
                summary='Create machine'
            )
            def create(self, request, *args, **kwargs):
                return super().create(request, *args, **kwargs)

            @extend_schema(
                description='Update machine.\n\n'
                            'Manager only.',
                summary='Update machine'
            )
            def update(self, request, *args, **kwargs):
                return super().update(request, *args,**kwargs)

            @extend_schema(
                description='Partial update machine.\n\n'
                            'Manager only.',
                summary='Partial update machine'
            )
            def partial_update(self, request, *args, **kwargs):
                return super().partial_update(request, *args, **kwargs)

            @extend_schema(
                description="Get list of machines.\n\n"
                            "List depends on user's role.\n\n"
                            "\tclient: list of all client's machines\n\n"
                            "\tservice organization: list of all machines where current user is service company\n\n"
                            "\tmanager: list of all machines\n\n"
                            "Authenticated only.",
                summary='Get machines list'
            )
            def list(self, request, *args, **kwargs):
                return super().list(request, *args, **kwargs)

            @extend_schema(
                description="Get machine instance.\n\n"
                            "Returns limited number of fields.\n\n"
                            "Unauthenticated only.",
                summary='Get machine instance'
            )
            def retrieve(self, request, *args, **kwargs):
                return super().retrieve(request, *args, **kwargs)

            @extend_schema(
                tags=['Machines'],
                summary='Get machines catalog',
                description="Get list of machines to use as select choices.\n\n"
                            "List depends on user's role.\n\n"
                            "\tFor clients: all machines where client == current user\n\n"
                            "\tFor service organizations: all machines where service_company == current user\n\n"
                            "\tFor managers: all machines where client and service_company are not null\n\n"
                            "Authenticated only."
            )
            def catalog(self, request, *args, **kwargs):
                return super().catalog(request, *args, **kwargs)

        return Fixed


class Fix2(OpenApiViewExtension):
    target_class = machines.api.MaintenanceViewSet

    def view_replacement(self):
        @extend_schema(tags=['Maintenance'])
        class Fixed(self.target_class):
            @extend_schema(
                description="Create maintenance.\n\n"
                            "Logic depends on user's role\n\n"
                            "\tclient: can create only self-performed maintenance (maintenance_carry_out = NULL)\n\n"
                            "\tservice organization: can create only maintenance performed by that organization "
                            "on machine where service_company is current user\n\n"
                            "\tmanager: can create any maintenance and set who performed it directly\n\n"
                            "Only machine owners or managers.",
                summary="Create maintenance"
            )
            def create(self, request, *args, **kwargs):
                return super().create(request, *args, **kwargs)

            @extend_schema(
                description="Update maintenance\n\n"
                            "Only maintenance owners or managers.\n\n"
                            "Maintenance owner is:\n\n"
                            "\tclient: if maintenance_carry_out is NULL and user is owner of maintenance.machine\n\n"
                            "\tservice organization: if maintenance_carry_out is current user",
                summary="Update maintenance"
            )
            def update(self, request, *args, **kwargs):
                return super().update(request, *args, **kwargs)

            @extend_schema(
                description="Partial update maintenance\n\n"
                            "Only maintenance owners or managers.\n\n"
                            "Maintenance owner is:\n\n"
                            "\tclient: if maintenance_carry_out is NULL and user is owner of maintenance.machine\n\n"
                            "\tservice organization: if maintenance_carry_out is current user",
                summary="Partial update maintenance"
            )
            def partial_update(self, request, *args, **kwargs):
                return super().partial_update(request, *args, **kwargs)

            @extend_schema(
                description="Get maintenance list\n\n"
                            "Response depends on user's role\n\n"
                            "\tclients: all maintenance where machine.client is current user\n\n"
                            "\tservice organizations: all maintenance where service_company is current user\n\n"
                            "\tmanager: all maintenance\n\n"
                            "Authenticated only",
                summary="Get maintenance list"
            )
            def list(self, request, *args, **kwargs):
                return super().list(request, *args, **kwargs)

        return Fixed


class Fix3(OpenApiViewExtension):
    target_class = machines.api.ReclamationViewSet

    def view_replacement(self):
        @extend_schema(tags=['Reclamations'])
        class Fixed(self.target_class):
            @extend_schema(
                description="Create reclamation\n\n"
                            "For service organizations or managers.",
                summary="Create reclamation"
            )
            def create(self, request, *args, **kwargs):
                return super().create(request, *args, **kwargs)

            @extend_schema(
                description="Update reclamation\n\n"
                            "For service organizations or managers",
                summary="Update reclamation"
            )
            def update(self, request, *args, **kwargs):
                return super().update(request, *args, **kwargs)

            @extend_schema(
                description="Partial update reclamation\n\n"
                            "For service organizations or mangers",
                summary="Partial update reclamation"
            )
            def partial_update(self, request, *args, **kwargs):
                return super().partial_update(request, *args, **kwargs)

            @extend_schema(
                description="Get list of reclamations\n\n"
                            "List depends on user's role.\n\n"
                            "\tclient: list of reclamations where machine.client is current user\n\n"
                            "\tservice organization: "
                            "list of all reclamations where service_company is current user\n\n"
                            "\tmanager: lst of all reclamations\n\n"
                            "Authenticated only",
                summary="Get list of reclamations"
            )
            def list(self, request, *args, **kwargs):
                return super().list(request, *args, **kwargs)

        return Fixed


class Fix4(OpenApiViewExtension):
    target_class = machines.api.CatalogViewSet

    def view_replacement(self):
        @extend_schema(tags=['Catalog'])
        class Fixed(self.target_class):
            @extend_schema(
                description="Create catalog item.\n\n"
                            "Managers only.",
                summary="Create catalog item"
            )
            def create(self, request, *args, **kwargs):
                return super().create(request, *args, **kwargs)

            @extend_schema(
                description="Update catalog item.\n\n"
                            "Managers only.",
                summary="Update catalog item"
            )
            def update(self, request, *args, **kwargs):
                return super().update(request, *args, **kwargs)

            @extend_schema(
                description="Partial update catalog item.\n\n"
                            "Managers only.",
                summary="Partial update catalog item"
            )
            def partial_update(self, request, *args, **kwargs):
                return super().partial_update(request, *args, **kwargs)

            @extend_schema(
                description="Get list of catalog items.\n\n"
                            "Supports filtering by entity.\n\n"
                            "Entity choices are: \n\n"
                            "\tEQ_M: Equipment model\n\n"
                            "\tEN_M: Engine model\n\n"
                            "\tTR_M: Transmission model\n\n"
                            "\tDA_M: Drive axle model\n\n"
                            "\tCB_M: Controlled bridge model\n\n"
                            "\tMN_T: Maintenance type\n\n"
                            "\tFAIL: Failure node\n\n"
                            "\tRE_M: Recovery method\n\n"
                            "Authenticated only",
                summary="Get list of catalog items",
                parameters=[
                    OpenApiParameter(name='entity', description='Filter by entity', type=str, many=True)
                ]
            )
            def list(self, request, *args, **kwargs):
                return super().list(request, *args, **kwargs)

        return Fixed
