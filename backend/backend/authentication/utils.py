from django.core.mail import EmailMessage
import random
import string


class Util:
    @staticmethod
    def send_email(data):
        email = EmailMessage(subject=data['subject'], body=data['body'], to=[data['to_email']])
        email.send()

    @staticmethod
    def get_random_password(length):
        # Choose from all lowercase letter
        letters = string.ascii_lowercase
        result_str = ''.join(random.choice(letters) for i in range(length))
        return result_str
