from django.db import models
from django.conf import settings
from django.utils import timezone
from django.core.exceptions import ValidationError


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
    voted_voters = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='%(class)s_voted_voters')
    winner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, null=True, blank=True,
                               related_name='%(class)s_winner')
    election_details = models.JSONField(null=True, blank=True)

    objects = models.Manager()
    currentElectionObjects = CurrentElectionObjects()
    completedElectionObjects = CompletedElectionObjects()
    upcomingElectionObjects = UpcomingElectionObjects()

    def __str__(self):
        return self.name

    def clean(self):
        if self.start_date > self.end_date:
            raise ValidationError("Start date cannot be greater than End date")


class Ballot(models.Model):
    election = models.ForeignKey(Election, on_delete=models.CASCADE)
    vote_details = models.JSONField()

    def __str__(self):
        return f'Ballot #{self.id} - {self.election}'

    def clean(self):
        if not self.vote_details:
            raise ValidationError("Relevant vote details not provided")

        # Check if vote contains preferences
        if 'preferences' not in self.vote_details:
            raise ValidationError("No preferences provided in vote details")

        # Check if all the candidate in the election are present in the ballot
        for candidate in self.election.candidates.all():
            if candidate.id not in self.vote_details['preferences']:
                raise ValidationError("Preferences do not include all candidates")

        # Check if all the candidates present in the ballot are actually candidates in the election
        for candidate_id in self.vote_details['preferences']:
            if not self.election.candidates.filter(pk=candidate_id).exists():
                raise ValidationError("Invalid candidates")
