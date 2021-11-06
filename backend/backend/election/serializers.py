from rest_framework import serializers
from .models import Election, Ballot
from django.contrib.auth.forms import get_user_model
from django.core.exceptions import ValidationError
from django.utils import timezone


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    user_name = serializers.CharField()

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'user_name')

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance


class ElectionSerializer(serializers.ModelSerializer):
    winner = UserSerializer(read_only=True)
    admins = UserSerializer(read_only=True, many=True)
    candidates = UserSerializer(read_only=True, many=True)
    voters = UserSerializer(read_only=True, many=True)

    class Meta:
        model = Election
        fields = '__all__'

    


class CandidateSerializer(serializers.Serializer):
    candidate = serializers.PrimaryKeyRelatedField(queryset=get_user_model().objects.all())
    election = serializers.PrimaryKeyRelatedField(queryset=Election.objects.all())


class BallotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ballot
        fields = '__all__'

    def validate(self, data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        if user and not user.is_anonymous:
            election = Election.objects.get(pk=data['election'].id)
            if election.voted_voters.filter(pk=user.id).exists():
                raise ValidationError(f"You already voted in this election")
            elif election.end_date < timezone.now():
                raise ValidationError(f"The election has ended")
            else:
                user = get_user_model().objects.get(pk=user.id)
                election.voted_voters.add(user)
                election.save()

        return data