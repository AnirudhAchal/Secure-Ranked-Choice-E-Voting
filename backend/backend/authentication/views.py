from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from django.contrib.sites.shortcuts import get_current_site
from rest_framework import generics
from django.urls import reverse
from .models import User
from .utils import Util


class UserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data

                # Email verification
                user = User.objects.get(email=json['email'])
                token = RefreshToken.for_user(user)
                current_site = get_current_site(request)
                relative_link = reverse('authentication:verify_email')
                absolute_url = f'http://{current_site.domain}{relative_link}?token={str(token.access_token)}'
                data = {
                    'domain': absolute_url,
                    'subject': 'Secure Rank Choice E-Voting - Verify your email',
                    'body': f'Hi {user.user_name},\nUse link below to verify your email.\n{absolute_url}',
                    'to_email': f'{user.email}',
                }
                Util.send_email(data)

                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class VerifyEmail(generics.GenericAPIView):
    def get(self):
        pass
