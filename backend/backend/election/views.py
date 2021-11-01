from rest_framework import generics, permissions
from .models import Election, Ballot
from .serializers import ElectionSerializer, BallotSerializer
from django.utils import timezone
from .utils import Util
from django.contrib.auth.forms import get_user_model


class ElectionDetailViewPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.voters.all()


class BallotCreateViewPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.election.voters.all()


class CurrentElectionList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ElectionSerializer

    def get_queryset(self):
        return Election.currentElectionObjects.filter(voters=self.request.user)


class UpcomingElectionList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ElectionSerializer

    def get_queryset(self):
        return Election.upcomingElectionObjects.filter(voters=self.request.user)


class CompletedElectionList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ElectionSerializer

    def get_queryset(self):
        return Election.completedElectionObjects.filter(voters=self.request.user)


class ElectionDetail(generics.RetrieveAPIView, ElectionDetailViewPermission):
    permission_classes = [permissions.IsAuthenticated, ElectionDetailViewPermission]
    serializer_class = ElectionSerializer

    def get_queryset(self):
        election_id = self.kwargs['pk']
        election = Election.objects.get(pk=election_id)

        # If election is completed we need to check if the results have been tabulated
        # and tally up the vote if they haven't already been counted
        if timezone.now() > election.end_date:

            # If election details are NULL then initialize object
            if not election.election_details:
                election.election_details = {}

            # If results not in election_details then calculate result using rank choice
            if 'results' not in election.election_details:
                ballot_objects = Ballot.objects.filter(election=election)
                ballots = []
                for ballot_object in ballot_objects:
                    ballots.append(ballot_object.vote_details['preferences'])

                results = Util.get_rank_choice_results(ballots=ballots)

                election.election_details['results'] = results
                election.winner = get_user_model().objects.get(pk=results['winner'])
                election.save()

        return Election.objects.all()


class BallotCreate(generics.CreateAPIView, BallotCreateViewPermission):
    permission_classes = [permissions.IsAuthenticated, BallotCreateViewPermission]
    serializer_class = BallotSerializer
