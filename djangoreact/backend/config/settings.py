import os
import json
import sys
import environ
from pathlib import Path
from datetime import datetime, timedelta


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECRET KEY 분리 (secrets.json 파일로)
# ROOT_DIR = os.path.dirname(BASE_DIR)
# SECRET_BASE_FILE = os.path.join(BASE_DIR, 'secrets.json')
# secrets = json.loads(open(SECRET_BASE_FILE).read())
# for key, value in secrets.items():
#     setattr(sys.modules[__name__], key, value)


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

STATE = "random_string"  # 나중에 url 요청 시 사용되는 값

# Initialise environment variables
env = environ.Env()
environ.Env.read_env()

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get("SECRET_KEY")

# # Social client key
KAKAO_REST_API_KEY = os.environ.get("KAKAO_REST_API_KEY")
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
GOOGLE_SECRET = os.environ.get("GOOGLE_SECRET")

# SECURITY WARNING: don't run with debug turned on in production!

DEBUG = False

ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # [CORS 관련]
    "corsheaders",
    # [my app]
    "api",

    # [Django-Rest-Framework]
    "rest_framework",
    "rest_framework.authtoken",

    # [djangorestframework-simplejwt]
    "rest_framework_simplejwt",
    # "rest_framework_simplejwt.token_blacklist",  # : blacklist테이블을 만들고 토큰 추가

    # [dj-rest-auth]
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "rest_auth",

    # [사용자 인증을 위한 기본 모듈] django-allauth
    "django.contrib.sites",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",

    # [소셜로그인 개별 서비스의 연결모듈 지원 내용]
    "allauth.socialaccount.providers.kakao",
    'allauth.socialaccount.providers.google',

    # [비밀번호 변경]
    "djoser",
]

SITE_ID = 1

# [참조하는 모델 지정] api 어플의 User 클래스 사용
AUTH_USER_MODEL = "api.User"

# Custom User Models
# https://kgu0724.tistory.com/96
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True            # email 필드 사용 o
ACCOUNT_USERNAME_REQUIRED = True        # username 필드 사용 o
# ACCOUNT_EMAIL_VERIFICATION = 'none' # 이메일 유효성 인증 필요 여부
# SOCIALACCOUNT_AUTO_SIGNUP = True # 기본값

# JWT 환경 설정
REST_USE_JWT = True

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=14),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',
    'TOKEN_TYPE_CLAIM': 'token_type',
    'JTI_CLAIM': 'jti',
}


MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # CORS 관련
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    # 'django.middleware.csrf.CsrfViewMiddleware',
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

CORS_ORIGIN_WHITELIST = [
    "http://elice-kdt-2nd-team6.koreacentral.cloudapp.azure.com:8000",
    "http://elice-kdt-2nd-team6.koreacentral.cloudapp.azure.com:3000",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

CORS_ALLOWED_ORIGINS = [
    "http://elice-kdt-2nd-team6.koreacentral.cloudapp.azure.com:8000",
    "http://elice-kdt-2nd-team6.koreacentral.cloudapp.azure.com:3000",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(BASE_DIR, "frontend", "build"),  # 경로 변경
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# 경로 추가
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "frontend", "build", "static"),
]

WSGI_APPLICATION = "config.wsgi.application"

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "team6",
        "USER": "postgres",
        "PASSWORD": "postgres",
        "HOST": "elice-kdt-2nd-team6.koreacentral.cloudapp.azure.com",
        "PORT": "5000",
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = "ko-kr"

TIME_ZONE = "Asia/Seoul"

USE_I18N = True

USE_L10N = True

USE_TZ = False

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = "/static/"

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# DRF 설정
REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": 100,
    # API에 대한 접근 권한 커스터마이징
    "DEFAULT_PERMISSION_CLASSES": (
        # "rest_framework.permissions.IsAuthenticated",
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
        "rest_framework.permissions.AllowAny",
    ),
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    "DEFAULT_PARSER_CLASSES": [
        "rest_framework.parsers.JSONParser",
        "rest_framework.parsers.FormParser",
        "rest_framework.parsers.MultiPartParser",
    ],
}


SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',
    'TOKEN_TYPE_CLAIM': 'token_type',
    'JTI_CLAIM': 'jti',
}

# api 어플의 User 클래스 사용
AUTH_USER_MODEL = "api.User"

"""gmail을 통해 사용자의 비밀번호 재설정 메일 보내주기 설정"""
# 메일을 호스트하는 서버
EMAIL_HOST = "smtp.gmail.com"
# gmail과의 통신하는 포트
EMAIL_PORT = "587"
# 발신할 이메일
EMAIL_HOST_USER = "igmy1108@gmail.com"
# 발신할 메일의 비밀번호
EMAIL_HOST_PASSWORD = "igmy2021!@"
# TLS 보안 방법
EMAIL_USE_TLS = True
# 사이트와 관련한 자동응답을 받을 이메일 주소
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
DOMAIN = "elice-kdt-2nd-team6.koreacentral.cloudapp.azure.com"
DJOSER = {
    'LOGIN_FIELD': 'email',
    'USER_CREATE_PASSWORD_RETYPE': True,
    'USERNAME_CHANGED_EMAIL_CONFIRMATION': True,
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,
    'SEND_CONFIRMATION_EMAIL': True,
    'SET_USERNAME_RETYPE': True,
    'SET_PASSWORD_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}',
    'ACTIVATION_URL': 'activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    'SERIALIZERS': {
        'user_create': 'api.serializers.UserCreateSerializer',
        'user': 'api.serializers.UserCreateSerializer',
        'current_user': 'api.serializers.UserCreateSerializer',
    }
}
