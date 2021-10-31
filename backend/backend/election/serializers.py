from rest_framework import serializers
from .models import Election
from django.contrib.auth.forms import get_user_model


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    user_name = serializers.CharField()

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'user_name')


class ElectionSerializer(serializers.ModelSerializer):
    winner = UserSerializer(read_only=True)
    admins = UserSerializer(read_only=True, many=True)
    candidates = UserSerializer(read_only=True, many=True)
    voters = UserSerializer(read_only=True, many=True)

    class Meta:
        model = Election
        fields = '__all__'
