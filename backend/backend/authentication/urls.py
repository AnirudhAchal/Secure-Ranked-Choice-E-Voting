from django.urls import path
from .views import UserCreate, BlacklistTokenUpdateView, VerifyEmail, ResendVerificationEmail

app_name = 'authentication'

urlpatterns = [
    path('register/', UserCreate.as_view(), name='create_user'),
    path('verify-email/', VerifyEmail.as_view(), name='verify_email'),
    path('resend-verification-email/', ResendVerificationEmail.as_view(), name='resend_verification_email'),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
]
