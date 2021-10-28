from rest_framework import generics
from .models import Election
# Import serializers


class CurrentElectionList(generics.ListAPIView):
    queryset = Election.objects.filter(has_started=True, has_ended=False)
    pass


class UpcomingElectionList(generics.ListAPIView):
    queryset = Election.objects.filter(has_started=False, has_ended=False)
    pass


class CompletedElectionList(generics.ListAPIView):
    queryset = Election.objects.filter(has_started=True, has_ended=True)
    pass


class ElectionDetail(generics.RetrieveAPIView):
    pass



