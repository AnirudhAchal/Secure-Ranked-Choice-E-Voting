from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .models import Election
from django.contrib.auth.forms import get_user_model
from django.utils import timezone
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken


class User(APITestCase):

    @classmethod
    def setUpTestData(cls):
        test_admin = get_user_model().objects.create_user(
            user_name='test_admin',
            email='test_admin@gmail.com',
            password='test_admin123',
            first_name='test',
            last_name='admin',
            is_active=True
        )
        test_voter = get_user_model().objects.create_user(
            user_name='test_voter',
            email='test_voter@gmail.com',
            password='test_voter123',
            first_name='test',
            last_name='voter',
            is_active=True
        )
        test_election = Election.objects.create(
            name='Test Election',
            start_date=timezone.now(),
            end_date=timezone.now()
        )
        test_election.admins.add(test_admin)
        test_election.voters.add(test_voter)

    def test_election_content(self):
        election = Election.objects.get(pk=1)
        self.assertEqual(election.name, 'Test Election')
        self.assertEqual(str(election.admins.first()), 'test_admin')
        self.assertEqual(str(election.voters.first()), 'test_voter')

    def test_upcoming_election_list(self):
        user = get_user_model().objects.get(email='test_voter@gmail.com')
        url = reverse('election:upcoming_election_list')

        # User not logged in
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # User logged in
        token = RefreshToken.for_user(user)
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=f'JWT {token.access_token}')
        response = client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_current_election_list(self):
        user = get_user_model().objects.get(email='test_voter@gmail.com')
        url = reverse('election:current_election_list')

        # User not logged in
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # User logged in
        token = RefreshToken.for_user(user)
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=f'JWT {token.access_token}')
        response = client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_completed_election_list(self):
        user = get_user_model().objects.get(email='test_voter@gmail.com')
        url = reverse('election:completed_election_list')

        # User not logged in
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # User logged in
        token = RefreshToken.for_user(user)
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=f'JWT {token.access_token}')
        response = client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
