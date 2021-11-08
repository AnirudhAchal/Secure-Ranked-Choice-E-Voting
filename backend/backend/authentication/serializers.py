from rest_framework import serializers
from .models import User
from django.core.exceptions import ValidationError


class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(read_only=True)
    user_name = serializers.CharField(read_only=True)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    about = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ('email', 'user_name', 'first_name', 'last_name', 'about')


class PasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True, write_only=True, min_length=8)

    class Meta:
        model = User
        fields =('password',)

    def update(self, instance, validated_data):
        if validated_data['password']:
            instance.set_password(validated_data['password'])

        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    about = serializers.CharField(required=False)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ('email', 'user_name', 'password', 'first_name', 'last_name', 'about')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
    def validate(self, data):
        email = data.get('email')
        user_name = data.get('user_name')
        if User.objects.filter(email = email).exists():
            raise ValidationError(f"Email is already in use")
        if User.objects.filter(user_name = user_name).exists():
            raise ValidationError(f"Username is already in use")
        return data


class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
