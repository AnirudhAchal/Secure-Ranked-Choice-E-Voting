from rest_framework.test import APITestCase
from django.contrib.auth.forms import get_user_model
from django.urls import reverse
from rest_framework import status


class TestUserModel(APITestCase):
    @classmethod
    def setUpTestData(cls):
        test_user = get_user_model().objects.create_user(
            user_name='test_user',
            email='test_user@gmail.com',
            password='test_user123456789',
            first_name='test',
            last_name='user',
        )
        test_superuser = get_user_model().objects.create_superuser(
            user_name='test_admin',
            email='test_admin@gmail.com',
            password='test_admin123456789',
            first_name='test',
            last_name='admin'
        )
        active_test_user = get_user_model().objects.create_user(
            user_name='active_test_user',
            email='active_test_user@gmail.com',
            password='active_test_user123',
            first_name='active_test',
            last_name='user',
            is_active=True
        )
        active_test_user.save()

    def test_user_content(self):
        user = get_user_model().objects.get(pk=1)
        self.assertEqual(user.user_name, 'test_user')
        self.assertEqual(user.email, 'test_user@gmail.com')
        self.assertEqual(user.first_name, 'test')
        self.assertEqual(user.last_name, 'user')
        self.assertEqual(user.is_staff, False)
        self.assertEqual(user.is_active, False)
        self.assertEqual(user.is_superuser, False)

    def test_superuser_content(self):
        user = get_user_model().objects.get(pk=2)
        self.assertEqual(user.user_name, 'test_admin')
        self.assertEqual(user.email, 'test_admin@gmail.com')
        self.assertEqual(user.first_name, 'test')
        self.assertEqual(user.last_name, 'admin')
        self.assertEqual(user.is_staff, True)
        self.assertEqual(user.is_active, True)
        self.assertEqual(user.is_superuser, True)

    def test_active_user_content(self):
        user = get_user_model().objects.get(pk=3)
        self.assertEqual(user.user_name, 'active_test_user')
        self.assertEqual(user.email, 'active_test_user@gmail.com')
        self.assertEqual(user.first_name, 'active_test')
        self.assertEqual(user.last_name, 'user')
        self.assertEqual(user.is_staff, False)
        self.assertEqual(user.is_active, True)
        self.assertEqual(user.is_superuser, False)

    def test_jwt_authentication(self):
        login_url = reverse('token_obtain_pair')
        user = get_user_model().objects.get(pk=3)

        # If user is not active
        user.is_active = False
        user.save()
        response = self.client.post(login_url, {
            'email': 'active_test_user@gmail.com',
            'password': 'active_test_user123'
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # If user is active
        user.is_active = True
        user.save()
        response = self.client.post(login_url, {
            'email': 'active_test_user@gmail.com',
            'password': 'active_test_user123'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
