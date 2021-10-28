# Generated by Django 3.2.7 on 2021-10-28 14:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('election', '0003_auto_20211028_1051'),
    ]

    operations = [
        migrations.AddField(
            model_name='election',
            name='candidates',
            field=models.ManyToManyField(related_name='election_candidates', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Ballot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vote', models.JSONField()),
                ('election', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='election.election')),
            ],
        ),
    ]
