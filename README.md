# Secure-Rank-Choice-E-Voting

Secure Ranked Choice E-Voting is a web application that provides an easy-to-use method of collecting encrypted ballots that is secure against malicious actors, and capable of authenticating voters properly. Additionally, the web interface allows the tabulation of election results and the public posting of those results. The elections will follow ranked choice voting which has become more popular than single choice voting.

The goal of this project is to build and deploy a robust, secure, reliable and user-friendly online voting application. This is achieved with cryptography methods. Real life use cases for this software application include Student Council elections, official college-related elections and any other type of election.

# Backend Setup

## 1. Create a new virtual environment

```
cd backend
python -m venv env
```

## 2. Activate the virtual enviromnent

On Windows

```
env\Scripts\activate
```

On Linux

```
source env/bin/activate
```

## 3. Install python packages

```
pip install -r requirements.txt
```

## 4. Setup environment variables

- Create a .env file at the root directoy of the backend (at the same level as `manage.py`)
- Add secret keys using the .env.example file as reference

## 5. Setup Django Database

```
cd backend
python manage.py migrate
```

## 6. Start Django Restful API

```
python manage.py runserver
```

# Frontend Setup

```
cd frontend
npm ci
npm start
```

# Resources

- [Django Rest Framework](https://www.django-rest-framework.org/)
- [React](https://reactjs.org/tutorial/tutorial.html)
