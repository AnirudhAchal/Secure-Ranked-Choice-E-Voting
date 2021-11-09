from rest_framework import serializers
from .models import Election, Ballot
from django.contrib.auth.forms import get_user_model
from django.core.exceptions import ValidationError
from django.utils import timezone
from authentication.utils import Util


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    user_name = serializers.CharField()

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'user_name')


class ElectionSerializer(serializers.ModelSerializer):
    winner = UserSerializer(read_only=True)
    voted_voters = UserSerializer(read_only=True, many=True)
    admins = UserSerializer(required=True, many=True)
    candidates = UserSerializer(required=False, many=True)
    voters = UserSerializer(required=False, many=True)

    class Meta:
        model = Election
        fields = '__all__'

    def validate(self, data):
        if data['start_date'] > data['end_date']:
            raise ValidationError("Start date must be less than End date")

        if len(data['admins']) == 0:
            raise ValidationError("Elections must have one or more admins")

        return data

    def create(self, validated_data):
        admins = validated_data.pop('admins', None)
        voters = validated_data.pop('voters', None)
        candidates = validated_data.pop('candidates', None)

        election = Election.objects.create(**validated_data)

        if admins:
            for admin_detail in admins:
                election.admins.add(get_user_model().objects.get(email=admin_detail['email']))
        else:
            raise ValidationError

        if voters:
            for voter_detail in voters:
                election.voters.add(get_user_model().objects.get(email=voter_detail['email']))

        if candidates:
            for candidate_detail in candidates:
                election.candidates.add(get_user_model().objects.get(email=candidate_detail['email']))

        return election


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
                # If voter has not already voted in the election, consider their code and add them
                # to the list of voted voters
                user = get_user_model().objects.get(pk=user.id)
                election.voted_voters.add(user)
                election.save()

                # Send Email
                email_data = {
                    'subject': 'Secure Rank Choice E-Voting - Voting successful',
                    'body': f'Hi {user.user_name},\nYour vote in Election: {election} has been successfully recorded.',
                    'to_email': f'{user.email}',
                }
                Util.send_email(email_data)

        return data
