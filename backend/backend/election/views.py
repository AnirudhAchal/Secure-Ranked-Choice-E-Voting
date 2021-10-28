from rest_framework import generics, permissions
from .models import Election
from .serializers import ElectionSerializer


class ElectionDetailViewPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.voters.all()


class CurrentElectionList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ElectionSerializer

    def get_queryset(self):
        return Election.objects.filter(has_started=True, has_ended=False, voters=self.request.user)


class UpcomingElectionList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ElectionSerializer

    def get_queryset(self):
        return Election.objects.filter(has_started=False, has_ended=False, voters=self.request.user)


class CompletedElectionList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ElectionSerializer

    def get_queryset(self):
        return Election.objects.filter(has_started=True, has_ended=True, voters=self.request.user)


class ElectionDetail(generics.RetrieveAPIView, ElectionDetailViewPermission):
    permission_classes = [permissions.IsAuthenticated, ElectionDetailViewPermission]
    queryset = Election.objects.all()
    serializer_class = ElectionSerializer
