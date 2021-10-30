from django.urls import path
from .views import CurrentElectionList, UpcomingElectionList, CompletedElectionList, ElectionDetail

app_name = 'election'

urlpatterns = [
    path('<int:pk>/', ElectionDetail.as_view(), name='election_detail'),
    path('current/', CurrentElectionList.as_view(), name='current_election_list'),
    path('upcoming/', UpcomingElectionList.as_view(), name='upcoming_election_list'),
    path('completed/', CompletedElectionList.as_view(), name='completed_election_list'),
]
