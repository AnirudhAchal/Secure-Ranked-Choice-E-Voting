from django.db import models
from django.conf import settings
from django.utils import timezone


class Election(models.Model):
    name = models.CharField(max_length=100)
    date_posted = models.DateTimeField(default=timezone.now)
    has_started = models.BooleanField(default=False)
    has_ended = models.BooleanField(default=False)
    admins = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='%(class)s_admins')
    voters = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='%(class)s_voters')
    candidates = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='%(class)s_candidates')
    winner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, null=True, blank=True,
                               related_name='%(class)s_winner')
    election_details = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.name


class Ballot(models.Model):
    election = models.ForeignKey(Election, on_delete=models.CASCADE)
    vote = models.JSONField()

    def __str__(self):
        return f'{self.election} {self.id}'
