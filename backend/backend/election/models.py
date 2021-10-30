from django.db import models
from django.conf import settings
from django.utils import timezone


class Election(models.Model):
    class CurrentElectionObjects(models.Manager):
        def get_queryset(self):
            current_date = timezone.now()
            return super().get_queryset().filter(start_date__lte=current_date, end_date__gte=current_date)

    class CompletedElectionObjects(models.Manager):
        def get_queryset(self):
            current_date = timezone.now()
            return super().get_queryset().filter(end_date__lt=current_date)

    class UpcomingElectionObjects(models.Manager):
        def get_queryset(self):
            current_date = timezone.now()
            return super().get_queryset().filter(start_date__gt=current_date)

    name = models.CharField(max_length=100)
    date_posted = models.DateTimeField(default=timezone.now)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    admins = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='%(class)s_admins')
    voters = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='%(class)s_voters')
    candidates = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='%(class)s_candidates')
    winner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, null=True, blank=True,
                               related_name='%(class)s_winner')
    election_details = models.JSONField(null=True, blank=True)

    objects = models.Manager()
    currentElectionObjects = CurrentElectionObjects()
    completedElectionObjects = CompletedElectionObjects()
    upcomingElectionObjects = UpcomingElectionObjects()

    def __str__(self):
        return self.name


class Ballot(models.Model):
    election = models.ForeignKey(Election, on_delete=models.CASCADE)
    vote = models.JSONField()

    def __str__(self):
        return f'{self.election} {self.id}'
