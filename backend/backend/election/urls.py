from django.urls import path
from .views import (CurrentElectionList, UpcomingElectionList, CompletedElectionList, ElectionDetail, BallotCreate,
                    CandidateCreate, ElectionCreate, AdminCurrentElectionList, AdminUpcomingElectionList,
                    AdminCompletedElectionList, AdminElectionDetail)

app_name = 'election'

urlpatterns = [
    path('<int:pk>/', ElectionDetail.as_view(), name='election_detail'),
    path('admin-<int:pk>/', AdminElectionDetail.as_view(), name='admin_election_detail'),
    path('current/', CurrentElectionList.as_view(), name='current_election_list'),
    path('upcoming/', UpcomingElectionList.as_view(), name='upcoming_election_list'),
    path('completed/', CompletedElectionList.as_view(), name='completed_election_list'),
    path('admin-current/', AdminCurrentElectionList.as_view(), name='admin_current_election_list'),
    path('admin-upcoming/', AdminUpcomingElectionList.as_view(), name='admin_upcoming_election_list'),
    path('admin-completed/', AdminCompletedElectionList.as_view(), name='admin_completed_election_list'),
    path('vote/', BallotCreate.as_view(), name='ballot_create'),
    path('create-candidate/', CandidateCreate.as_view(), name='candidate_create'),
    path('create/', ElectionCreate.as_view(), name='election_create'),
]
