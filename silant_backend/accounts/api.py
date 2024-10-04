from django.contrib.auth import get_user_model
from rest_framework import views, exceptions, status, viewsets, mixins
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.serializers import GetUserSerializer, UserMeSerializer

User = get_user_model()


class LogoutView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.auth

        try:
            Token.objects.get(key=token).delete()
        except Token.DoesNotExist:
            raise exceptions.NotFound("Token not found!")

        return Response({'detail': 'logged out successfully'}, status=status.HTTP_200_OK)


class UserViewSet(
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    queryset = User.objects.all()
    serializer_class = GetUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.action == 'list':
            queryset = User.objects.all()

            request_roles = self.request.query_params.getlist('role')

            if request_roles:
                available_roles = set(User.ROLE_CHOICES.keys())
                roles_list = [r.upper() for r in request_roles if r.upper() in available_roles]

                queryset = queryset.filter(role__in=roles_list)

            return queryset

        return super().get_queryset()

    def get_serializer_class(self):
        if self.action == 'me':
            return UserMeSerializer

        return super().get_serializer_class()

    @action(detail=False, methods=['get'])
    def me(self, request):
        """
        Get info about current user.

        Authenticated only.
        """
        serializer = self.get_serializer(request.user)

        return Response(data=serializer.data, status=status.HTTP_200_OK)
