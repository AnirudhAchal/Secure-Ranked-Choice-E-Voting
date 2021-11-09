from rest_framework import generics, permissions, views, status
from .models import Election, Ballot
from .serializers import ElectionSerializer, BallotSerializer, CandidateSerializer
from django.utils import timezone
from .utils import Util
from authentication.utils import Util as UserUtil
from django.contrib.auth.forms import get_user_model
from rest_framework.response import Response


class ElectionDetailViewPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.voters.all()


class AdminElectionDetailViewPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.admins.all()


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


class AdminCurrentElectionList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ElectionSerializer

    def get_queryset(self):
        return Election.currentElectionObjects.filter(admins=self.request.user)


class AdminUpcomingElectionList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ElectionSerializer

    def get_queryset(self):
        return Election.upcomingElectionObjects.filter(admins=self.request.user)


class AdminCompletedElectionList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ElectionSerializer

    def get_queryset(self):
        return Election.completedElectionObjects.filter(admins=self.request.user)


class AdminElectionDetail(generics.RetrieveAPIView, AdminElectionDetailViewPermission):
    permission_classes = [permissions.IsAuthenticated, AdminElectionDetailViewPermission]
    serializer_class = ElectionSerializer
    queryset = Election.objects.all()


class ElectionDetail(generics.RetrieveAPIView, ElectionDetailViewPermission):
    permission_classes = [permissions.IsAuthenticated, ElectionDetailViewPermission]
    serializer_class = ElectionSerializer

    def get_queryset(self):
        election_id = self.kwargs['pk']

        if Election.objects.filter(pk=election_id).exists():
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

                    if results['winner']:
                        election.winner = get_user_model().objects.get(pk=results['winner'])

                    election.save()

        return Election.objects.all()


class ElectionCreate(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ElectionSerializer


class BallotCreate(generics.CreateAPIView, BallotCreateViewPermission):
    permission_classes = [permissions.IsAuthenticated, BallotCreateViewPermission]
    serializer_class = BallotSerializer


class CandidateCreate(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = CandidateSerializer(data=request.data)
        if serializer.is_valid():
            json = serializer.data

            candidate = get_user_model().objects.get(pk=json['candidate'])
            election = Election.objects.get(pk=json['election'])

            # Check if candidate is a voter in the election and that the election has not ended
            if candidate in election.voters.all() and timezone.now() < election.start_date:
                if candidate not in election.candidates.all():
                    election.candidates.add(candidate)
                    election.save()

                    # Send Email
                    email_data = {
                        'subject': 'Secure Rank Choice E-Voting - Candidate registration successful',
                        'body': f'Hi {candidate.user_name},\nYou are now a candidate in Election: {election}\n'
                                f'Good luck!',
                        'to_email': f'{candidate.email}',
                    }
                    UserUtil.send_email(email_data)

                    return Response(json, status=status.HTTP_201_CREATED)

            return Response(json, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
