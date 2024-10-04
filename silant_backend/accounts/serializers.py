from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class GetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'role', 'org_name']


class UserMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'role', 'username', 'org_name']


class LogoutResponseSerializer(serializers.Serializer):
    detail = serializers.CharField(read_only=True, default='logged out successfully')
