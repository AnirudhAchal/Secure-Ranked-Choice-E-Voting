from rest_framework import serializers
from .models import Election, Ballot
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


class BallotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ballot
        fields = '__all__'

    """def validate(self, data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        if user:
            print(user)"""

