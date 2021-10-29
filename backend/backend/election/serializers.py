from rest_framework import serializers
from .models import Election


class ElectionSerializer(serializers.ModelSerializer):
    winner = serializers.CharField()

    class Meta:
        model = Election
        fields = '__all__'
