from django.urls import path
from .views import (UserCreate, BlacklistTokenUpdateView, VerifyEmail, ResendVerificationEmail, UserDetail,
                    CurrentUserDetail, PasswordReset, PasswordResetEmail, UserList)

app_name = 'authentication'

urlpatterns = [
    path('register/', UserCreate.as_view(), name='create_user'),
    path('verify-email/', VerifyEmail.as_view(), name='verify_email'),
    path('resend-verification-email/', ResendVerificationEmail.as_view(), name='resend_verification_email'),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
    path('user/<str:user_name>/', UserDetail.as_view(), name='user_detail'),
    path('current-user/<int:pk>/', CurrentUserDetail.as_view(), name='current_user_detail'),
    path('password-reset/<int:pk>/', PasswordReset.as_view(), name='password_reset'),
    path('password-reset-email/', PasswordResetEmail.as_view(), name='password_reset_email'),
    path('user-list/', UserList.as_view(), name='user_list'),
]
