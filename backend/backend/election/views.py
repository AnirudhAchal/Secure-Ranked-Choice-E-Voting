from rest_framework import generics
from .models import Election
from .serializers import ElectionSerializer


class CurrentElectionList(generics.ListAPIView):
    queryset = Election.objects.filter(has_started=True, has_ended=False)
    serializer_class = ElectionSerializer


class UpcomingElectionList(generics.ListAPIView):
    queryset = Election.objects.filter(has_started=False, has_ended=False)
    serializer_class = ElectionSerializer


class CompletedElectionList(generics.ListAPIView):
    queryset = Election.objects.filter(has_started=True, has_ended=True)
    serializer_class = ElectionSerializer


class ElectionDetail(generics.RetrieveAPIView):
    pass



