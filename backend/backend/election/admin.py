from django.contrib import admin
from .models import Election, Ballot

admin.site.register(Election)
admin.site.register(Ballot)
