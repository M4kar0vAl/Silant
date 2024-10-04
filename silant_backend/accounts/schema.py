from drf_spectacular.extensions import OpenApiViewExtension
from drf_spectacular.utils import extend_schema, OpenApiParameter

import accounts.api
from accounts.serializers import LogoutResponseSerializer


class Fix1(OpenApiViewExtension):
    target_class = accounts.api.LogoutView

    def view_replacement(self):
        class Fixed(self.target_class):
            @extend_schema(
                description="Logout current user.\n\n"
                            "Post request body should be empty, will be ignored anyway.\n\n"
                            "Authenticated only.",
                summary="Logout",
                responses={200: LogoutResponseSerializer}
            )
            def post(self, request):
                return super().post(request)

        return Fixed


class Fix2(OpenApiViewExtension):
    target_class = accounts.api.UserViewSet

    def view_replacement(self):
        @extend_schema(tags=['Users'])
        class Fixed(self.target_class):
            @extend_schema(
                description="Get list of users.\n\n"
                            "Supports filtering by user's role\n\n"
                            "User roles are:\n\n"
                            "\tC: Client\n\n"
                            "\tS: Service organization\n\n"
                            "\tM: Manager\n\n"
                            "Authenticated only.",
                summary="Get list  of users",
                parameters=[
                    OpenApiParameter(name='role', description='Filter by role', type=str, many=True)
                ]
            )
            def list(self, request, *args, **kwargs):
                return super().list(request, *args, **kwargs)

            @extend_schema(
                summary="Get current user info",
                tags=['Users']
            )
            def me(self, request, *args, **kwargs):
                return super().me(request, *args, **kwargs)

        return Fixed
