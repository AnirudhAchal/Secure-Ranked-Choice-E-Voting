from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, EmailSerializer, ProfileSerializer, PasswordSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .models import User
from .utils import Util
import jwt
from django.conf import settings


class UserCreate(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data

                # Email verification
                user = User.objects.get(email=json['email'])
                token = RefreshToken.for_user(user)
                origin_site = request.META['HTTP_ORIGIN']
                relative_link = '/verify-email/'
                absolute_url = f'{origin_site}{relative_link}{str(token.access_token)}'
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
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class VerifyEmail(generics.GenericAPIView):
    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=settings.SIMPLE_JWT['ALGORITHM'])
            user = User.objects.get(id=payload['user_id'])

            if not user.is_active:
                user.is_active = True
                user.save()

            return Response({'message': 'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Activation link expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


class ResendVerificationEmail(generics.GenericAPIView):
    serializer_class = EmailSerializer

    def post(self, request):
        serializer = EmailSerializer(data=request.data)

        if serializer.is_valid():
            json = serializer.data
            email = json['email']
            if email:
                try:
                    user = User.objects.get(email=email)
                    if not user.is_active:
                        # Resend email to user
                        token = RefreshToken.for_user(user)
                        origin_site = request.META['HTTP_ORIGIN']
                        relative_link = '/verify-email/'
                        absolute_url = f'{origin_site}{relative_link}{str(token.access_token)}'
                        data = {
                            'domain': absolute_url,
                            'subject': 'Secure Rank Choice E-Voting - Verify your email',
                            'body': f'Hi {user.user_name},\nUse link below to verify your email.\n{absolute_url}',
                            'to_email': f'{user.email}',
                        }
                        Util.send_email(data)
                        return Response({'message': 'Successfully resent'}, status=status.HTTP_200_OK)
                    return Response({'error': 'Email already verified'}, status=status.HTTP_400_BAD_REQUEST)
                except Exception as e:
                    return Response({'error': 'No account exists with this email'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'error': 'Email is a required field'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProfileSerializer
    queryset = User.objects.all()
    lookup_field = 'user_name'


class UserList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProfileSerializer
    queryset = User.objects.all()


class CurrentUserDetailViewPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj


class CurrentUserDetail(generics.RetrieveUpdateAPIView, CurrentUserDetailViewPermission):
    permission_classes = [permissions.IsAuthenticated, CurrentUserDetailViewPermission]
    serializer_class = ProfileSerializer
    queryset = User.objects.all()


class PasswordReset(generics.UpdateAPIView,  CurrentUserDetailViewPermission):
    permission_classes = [permissions.IsAuthenticated, CurrentUserDetailViewPermission]
    serializer_class = PasswordSerializer
    queryset = User.objects.all()


class PasswordResetEmail(generics.GenericAPIView):
    serializer_class = EmailSerializer

    def post(self, request):
        serializer = EmailSerializer(data=request.data)

        if serializer.is_valid():
            json = serializer.data
            email = json['email']
            if email:
                try:
                    # Send password reset email
                    user = User.objects.get(email=email)
                    new_temporary_password = Util.get_random_password(10)
                    user.set_password(new_temporary_password)
                    user.save()
                    data = {
                        'subject': 'Secure Rank Choice E-Voting - Reset your password',
                        'body': f'Hi {user.user_name},\nUse this temporary password to login to your account. '
                                f'You can change your password once you login.\nPassword: {new_temporary_password}',
                        'to_email': f'{user.email}',
                    }
                    Util.send_email(data)
                    return Response({'message': 'Successfully sent'}, status=status.HTTP_200_OK)
                except Exception as e:
                    return Response({'error': 'No account exists with this email'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'error': 'Email is a required field'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
