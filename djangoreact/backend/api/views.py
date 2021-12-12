import pandas as pd
from sklearn.cluster import KMeans
from .photo_key import photo_key
import tensorflow as tf
import cv2
import numpy as np
import os
import requests
import json
from .serializers import UserCreateSerializer, InfoPillSerializer, ImageForm, UserPillListSerializer, PillDetailSerializer, MyTokenObtainPairSerializer, MyTokenRefreshSerializer, RefreshTokenSerializer
from .models import User, InfoPill, UserPill, UploadFileModel, SearchHistory
from django.core.mail import message
from django.core.mail.message import EmailMessage
from django.core.checks.messages import Info
from django.core.paginator import Paginator
from django.conf import settings
from django.db.models.expressions import RawSQL
from rest_framework import status, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenViewBase, TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.models import SocialAccount
from allauth.socialaccount.providers.google import views as google_view
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db.models import Q
from django.shortcuts import redirect, reverse
from json.decoder import JSONDecodeError
from django.http import JsonResponse, HttpResponse
from django.contrib import auth
from datetime import timedelta
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.generics import GenericAPIView
from django.contrib.auth.views import PasswordResetView
from django.utils import timezone
from django.views.generic import ListView


"""회원가입"""


@method_decorator(csrf_exempt, name="dispatch")
@api_view(["POST"])
@permission_classes([AllowAny])
def createUser(request):
    if request.method == "POST":
        serializer = UserCreateSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_400_CONFLICT)

        if (User.objects.filter(email=serializer.validated_data["email"]).first() is None):
            serializer.save()
            return Response({"message": "ok"}, status=status.HTTP_201_CREATED)
        return Response({"message": "duplicate email"}, status=status.HTTP_200_OK)


# 모든 알약 정보


@api_view(["GET"])
def search_all(request):
    pill = InfoPill.objects.all()
    serializer = InfoPillSerializer(pill, many=True)

    return Response(serializer.data)


# 알약 직접 검색


@api_view(["GET"])
@permission_classes([AllowAny])
def search_direct(request):
    name = request.GET.get("name")  # 약 이름
    shape = request.GET.get("shape")  # 약 모양
    color_front = request.GET.get("color_front")  # 약 앞면 색상

    # 만약 ?name={약이름} 이랑 모양, 앞면 색상으로 검색 시 해당 이름과 모양, 색상이 포함된 값을 반환해줌
    if not name:
        name = ''
    if not color_front:
        color_front = ''

    if not shape:
        pill = InfoPill.objects.filter(item_name__contains=name) & InfoPill.objects.filter(
            color_front__contains=color_front)
    if shape:
        pill = InfoPill.objects.filter(shape__exact=shape) & InfoPill.objects.filter(
            item_name__contains=name) & InfoPill.objects.filter(color_front__contains=color_front)

    serializer = InfoPillSerializer(pill, many=True)

    page = int(request.GET.get('page', '1'))  # 페이지 params
    p = Paginator(serializer.data, 10)  # 페이지당 10개씩 보여 주기
    page_data = {"total_page": p.num_pages}, {"count": p.count}, {
        "page": page}, p.page(page).object_list

    return Response(page_data)


# 알약 상세정보
"""
약 이름 = item_name
사진 링크 = image
분류명 = bit
성분/함량/단위 = sungbun
효능/효과 = efcy_qesitm
용법/용량 = use_method_qesitm
부작용(이상반응의 부분집합) = se_qesitm
사용 시 주의사항 = atpn_qesitm
보관 방법 = deposit_method_qesitm
타 악과의 상호작용 = intrc_qesitm
"""


class PillDetailView(APIView):
    permissions_classes = [AllowAny]

    def get(self, request):
        pill_id = request.GET.get("pill_id", "")
        pill = InfoPill.objects.filter(item_num=pill_id)
        if pill is None:
            return Response("해당 품목일련번호가 없습니다.")
        # 로그인 한 유저가 없는 경우
        if request.user.is_anonymous:
            serializer = PillDetailSerializer(pill, many=True)
            return Response(serializer.data)
        # 로그인 한 유저가 있는 경우: 검색 기록 추가
        user_email = request.user
        old_search_history = SearchHistory.objects.filter(
            user_email=user_email,
            pill_num=pill_id
        ).first()
        # 같은 알약 기록이 이미 있는 경우
        if old_search_history is not None:
            serializer = PillDetailSerializer(pill, many=True)
            return Response(serializer.data)
        # 같은 알약 기록이 없는 경우
        pill_num = InfoPill.objects.get(item_num=pill_id)
        SearchHistory.objects.create(user_email=user_email, pill_num=pill_num)
        serializer = PillDetailSerializer(pill, many=True)
        return Response(serializer.data)


# 유저 즐겨찾기 API


@api_view(["GET", "POST", "DELETE"])
@permission_classes([IsAuthenticated])
def user_pill(request):
    content = {  # get으로 약 정보 확인하기 (지금은 유저로 돌림)
        "user": str(request.user.email),
    }

    user_email = request.user  # 유저 불러오기

    if "#$%" in user_email.email:
        user_email.email = user_email.email.split("#$%")[1]

    pill = InfoPill.objects.all()  # 약 정보 데이터 베이스 전부 가져오기
    pn = request.GET.get("pn", "")  # 약 넘버

    if request.method == "GET":
        if pn:
            # url 약 넘버 정확하게 일치한다면
            pill = pill.filter(Q(item_num__exact=pn)).distinct()
            if UserPill.objects.filter(Q(user_email=user_email.email) & Q(pill_num=pn)):
                return Response(True)
            else:
                return Response(False)

    if request.method == "POST":
        if pn:
            # url 약 넘버 정확하게 일치한다면
            pill = pill.filter(Q(item_num__exact=pn)).distinct()
            serializer = InfoPillSerializer(pill, many=True)
            pill_num = InfoPill.objects.get(
                item_num=pn)  # 입력한 약 넘버와 일치하는 약 번호 가져오기

            # UserPill 테이블에 user_email과 pill_num 저장
            userpillinfo = UserPill(user_email=user_email, pill_num=pill_num)
            userpillinfo.save()  # 저장 22
            return Response(f"{serializer.data}를 성공적으로 즐겨찾기에 추가했습니다.")
        else:
            return Response("올바른 요청 값이 아닙니다.")  # 정확한 약 넘버가 들어오지 않다면!

    if request.method == "DELETE":
        if pn:
            # url 약 넘버 정확하게 일치한다면
            pill = pill.filter(Q(item_num__exact=pn)).distinct()
            serializer = InfoPillSerializer(pill, many=True)
            pill_num = InfoPill.objects.get(
                item_num=pn)  # 입력한 약 넘버와 일치하는 약 번호 가져오기

            # test = UserPill(user_email=user_email, pill_num=pill_num)
            # UserPill 테이블에서 해당하는(pn) 값 삭제
            UserPill.objects.filter(
                user_email=user_email, pill_num=pill_num).delete()
            return Response("삭제 성공!")
        else:
            return Response("올바른 삭제 형식을 맞춰주세요.")


# 유저가 즐겨찾기 한 목록 보여주는 API


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_pill_list(request):
    """
    필요한 반환 리스트: PillInfo
    약 이름 = item_name
    사진 링크 = image
    성분/함량 = sungbun
    하루 복용량 = use_method_qesitm
    """

    user_email = request.user.email

    if "#$%" in user_email:
        user_email = user_email.split("#$%")[1]

    user_pill = UserPill.objects.filter(
        user_email=user_email).values_list("pill_num")
    pill = InfoPill.objects.filter(item_num__in=user_pill)

    serializer = UserPillListSerializer(pill, many=True)

    return Response(serializer.data)


# 비밀번호 변경: 이메일 보내주는 함수 (테스트용)


def send_email(request):
    subject = "message"
    to = ["igmy1108@gmail.com"]
    from_email = "igmy1108@email.com"
    message = "메시지 테스트"
    EmailMessage(subject=subject, body=message,
                 to=to, from_email=from_email).send()


# 검색 기록
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def search_history(request):
    user_email = str(request.user.email)

    if "#$%" in user_email:
        user_email = user_email.split("#$%")[1]

    data = SearchHistory.objects.filter(user_email=user_email).all().count()

    if data == 0:
        return Response({"message": "최근 검색 기록이 없습니다."})

    old_history = (
        SearchHistory.objects.filter(
            Q(user_email=user_email)
            & Q(create_at__lte=date.today() - timedelta(days=7))
        )
        .all()
        .count()
    )

    # 일주일 지난 기록이 있는 경우
    if old_history > 0:
        SearchHistory.objects.filter(
            Q(user_email=user_email)
            & Q(create_at__lte=date.today() - timedelta(days=7))
        ).all().delete()

        history_pill_list = (
            SearchHistory.objects.filter(user_email=user_email)
            .all()
            .values_list("pill_num")
            .order_by("id")[:9]
        )
        pills = InfoPill.objects.filter(item_num__in=history_pill_list)
        serializer = UserPillListSerializer(pills, many=True)

        return Response(serializer.data)

    # 일주일이 지난 기록이 없는 경우
    history_pill_list = (
        SearchHistory.objects.filter(user_email=user_email)
        .all()
        .values_list("pill_num")
        .order_by("id")[:9]
    )
    pills = InfoPill.objects.filter(item_num__in=history_pill_list)

    serializer = UserPillListSerializer(pills, many=True)

    return Response(serializer.data)


# 사진 검색 API
with open('./AI/pill_90.json', 'r') as f:
    pill_dict = json.load(f)

df = pd.read_excel('./AI/ai_medicine.xlsx')
model = tf.keras.models.load_model('model')

def color_distance(r1, g1, b1, r2, g2, b2):
    red_mean = int(round((r1 + r2) / 2))
    r = int(r1 - r2)
    g = int(g1 - g2)
    b = int(b1 - b2)
    return (((512 + red_mean) * r * r) >> 8) + 4 * g * g + (((767 - red_mean) * b * b) >> 8)


@method_decorator(csrf_exempt, name='dispatch')
@api_view(['POST'])
@permission_classes([AllowAny])
def result_photo(request):
    form = ImageForm(request.POST, request.FILES)
    if form.is_valid():
        image_name = form.save()
        image_path = f'{image_name.files}'
        try:
            response = requests.post(
                'https://sdk.photoroom.com/v1/segment',
                data={'bg_color': '#000000'},
                headers={'x-api-key': f'{photo_key}'},
                files={'image_file': open(f'{image_path}', 'rb')},
            )

            response.raise_for_status()
            with open(f'{image_path}', 'wb') as f:
                f.write(response.content)
        except:
            return Response("이미지 형식의 파일을 올려주세요.")

        try:
            img_array = np.fromfile(f"{image_path}", np.uint8)
            image = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
            image_gray = cv2.imdecode(img_array, cv2.IMREAD_GRAYSCALE)
            number = np.ones_like(image_gray) * 255
            mul = cv2.multiply(image_gray, number)
            contours, _ = cv2.findContours(
                mul, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            contours_xy = np.array(contours)
            for i in range(len(contours_xy)):
                if len(contours_xy[i]) < 10:
                    continue
                x_min, x_max = 0, 0
                value = list()
                for j in range(len(contours_xy[i])):
                    value.append(contours_xy[i][j][0][0])
                    x_min = min(value)
                    x_max = max(value)

                y_min, y_max = 0, 0
                value = list()
                for j in range(len(contours_xy[i])):
                    value.append(contours_xy[i][j][0][1])
                    y_min = min(value)
                    y_max = max(value)

                x = x_min
                y = y_min
                w = x_max-x_min
                h = y_max-y_min

                img_trim = image[y:y+h, x:x+w]
                cv2.imwrite(f"{image_path}", img_trim)
        except:
            return Response("알약이 중앙에 위치하도록 사진을 다시 촬영하여주세요.")

        image = cv2.imread(f'{image_path}')
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        x, y, _ = image.shape

        big, small = max(x, y), min(x, y)
        shape = 1 if ((3*big) // 4) > small else 0

        image = image.reshape((image.shape[0] * image.shape[1], 3))

        k = 2
        clt = KMeans(n_clusters=k)
        clt.fit(image)

        color_list = []

        for center in clt.cluster_centers_:
            color_list.append(list(center))
        color_list.sort()
        color_list = color_list[-1]

        # 흰색, 갈색, 노랑, 초록
        color_ck = [[224, 224, 224], [150, 100, 80],
                    [180, 150, 80], [80, 180, 140]]

        color_distance_list = []

        for i in range(len(color_ck)):
            color_diff = color_distance(
                color_list[0], color_list[1], color_list[2], color_ck[i][0], color_ck[i][1], color_ck[i][2])
            color_distance_list.append((color_diff, i))
        color_distance_list.sort()
        color_distance_list
        color = color_distance_list[0][1]
        color_distance_list

        try:
            predict_list = []
            predict_img = cv2.imread(f'{image_path}')

            height, width, _ = predict_img.shape
            mask = np.zeros([224, 224, 3], np.uint8)

            if width >= height:
                predict_img = cv2.resize(predict_img, (224, int(
                    224*(height/width))), interpolation=cv2.INTER_LINEAR)
                h = (224 - predict_img.shape[0]) // 2
                mask[h:h+predict_img.shape[0], :] = predict_img
                predict_img = mask / 255
            else:
                predict_img = cv2.resize(
                    predict_img, (int(224*(width/height)), 224), interpolation=cv2.INTER_LINEAR)
                h = (224 - predict_img.shape[1]) // 2
                mask[:, h:h+predict_img.shape[1]] = predict_img
                predict_img = mask / 255

            predict_list.append(predict_img)
            predict_list = np.array(predict_list)

            predict = model.predict(predict_list)

            predict_list = []

            for idx, percent in enumerate(predict[0].tolist()):
                predict_list.append((percent, idx))

            predict_list.sort(reverse=True)

            result_num = []
            percent_list = []
            for i in range(len(predict_list)):
                num = predict_list[i][1]
                if df.iloc[num]['의약품제형'] == shape and df.iloc[num]['색상앞'] == color:
                    result_num.append(num)
                if i < 5:
                    percent_list.append(predict_list[i][0])

            content = {
                'message': '알약 인식 성공'
            }
            for i in range(len(result_num)):
                if i > 4:
                    break
                pill = InfoPill.objects.all()
                pill = pill.filter(
                    Q(item_num__exact=pill_dict[str(result_num[i])])).distinct()
                serializer = InfoPillSerializer(pill, many=True)
                content[f'{i+1}.알약'] = serializer.data
                content[f'{i+1}.확률'] = '{:.2f}%'.format(percent_list[i]*100, 2)

            return Response(content)

        except:
            return Response("인공지능 모델을 불러오지 못했습니다.")

    else:
        return Response("파일을 선택해주세요.")


# 검색 기록
class SearchHistoryView(APIView, ListView):
    permissions_classes = [IsAuthenticated]
    model = SearchHistory

    def get_queryset(self):
        user_email = str(self.request.user.email)

        if "#$%" in user_email:
            user_email = user_email.split("#$%")[1]

        queryset = super().get_queryset()
        queryset = queryset.filter(user_email=user_email).values_list(
            "pill_num", flat=True).order_by("id")[:9]
        return queryset

    def get(self, request):
        user_email = str(request.user.email)

        if "#$%" in user_email:
            user_email = user_email.split("#$%")[1]

        data = SearchHistory.objects.filter(user_email=user_email).count()
        search_history_max_days = 7
        max_days_ago = timezone.now() - timedelta(days=search_history_max_days)

        # 검색 기록이 없는 경우
        if data == 0:
            return Response({"message": "최근 검색 기록이 없습니다."})

        old_history = SearchHistory.objects.filter(
            user_email=user_email,
            create_at__lte=max_days_ago
        ).count()

        # 일주일 지난 기록이 없는 경우
        if old_history == 0:
            history_pill_list = self.get_queryset()
            pills = InfoPill.objects.filter(item_num__in=history_pill_list)
            serializer = UserPillListSerializer(pills, many=True)
            return Response(serializer.data)
        # 일주일 지난 기록이 있는 경우
        SearchHistory.objects.filter(
            user_email=user_email,
            create_at__lte=max_days_ago
        ).delete()
        history_pill_list = self.get_queryset()
        # 오래된 기록 삭제 후 최근 기록이 남아있는 경우
        if history_pill_list:
            pills = InfoPill.objects.filter(item_num__in=history_pill_list)
            serializer = UserPillListSerializer(pills, many=True)
            return Response(serializer.data)
        # 오래된 기록 삭제 후 최근 기록이 없는 경우
        return Response({"message": "최근 검색 기록이 없습니다."})


# 로그인 유지를 위한 토큰 유효성 검사 api
# @api_view(["GET"])
# @permission_classes([AllowAny])
# def check_token(request):
#     print('user:', request.user)
#     if request.user.is_authenticated:
#         result = {
#             'username': str(request.user),
#             'email': str(request.user.email),
#             'token': str(request.META['HTTP_AUTHORIZATION']).split(' ')[1]
#         }
#         return Response(result)
#     return Response("토큰이 유효하지 않습니다.")


'''OAuth : kakao social login'''
URL_FRONT = "http://elice-kdt-2nd-team6.koreacentral.cloudapp.azure.com/"
URL_BACK = "http://elice-kdt-2nd-team6.koreacentral.cloudapp.azure.com/"


@api_view(["POST"])
@permission_classes([AllowAny])
def kakao_login(request):
    code = request.GET.get("code", '')  # 파라미터
    KAKAO_CLIENT_ID = getattr(settings, "KAKAO_REST_API_KEY")
    REDIRECT_URI = f"{URL_FRONT}oauth/callback/kakao"
    # 카카오에 요청해서 token data 가져오기
    request_uri = f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={KAKAO_CLIENT_ID}&code={code}&redirect_uri={REDIRECT_URI}"
    token_data = requests.get(request_uri).json()

    access_token = token_data.get('access_token')
    # Authorization(인가코드) : header로 꼭 설정해야함 (카카오는 인가코드 기반으로 토큰을 요청, 받음)
    headers = {
        "Authorization": f"Bearer {access_token}",
    }
    # 사용자 정보 json 형식으로 가져오기
    get_user_info_url = 'https://kapi.kakao.com/v2/user/me'
    user_info_json = requests.get(get_user_info_url, headers=headers).json()

    uid = user_info_json.get("id")
    email = user_info_json.get('kakao_account').get('email')
    username = user_info_json.get('properties').get('nickname')
    password = f"password{uid}"
    provider = "kakao"

    # email 수집에 동의하지 않아서 값이 비어있는 경우
    if email == "" or email == None:
        email = f"{uid}@socialemail.com"

    # db에 이메일이 존재하는 경우
    if User.objects.filter(email=email).exists():
        # 소셜 로그인 (토큰 발급)
        if SocialAccount.objects.filter(uid=uid).exists():

            data = {
                'email': email,
                'password': password,
            }

            try:
                serializer = MyTokenObtainPairSerializer(data=data)
                serializer.is_valid(raise_exception=True)
            except:
                email = str(uid) + "#$%" + email
                data = {
                    'email': email,
                    'password': password,
                }
                serializer = MyTokenObtainPairSerializer(data=data)
                serializer.is_valid(raise_exception=True)

            return Response(serializer.validated_data, status=status.HTTP_200_OK)

        # 해당 이메일로 자체 로그인한 경우 (email+uid로 새로운 email만들어서 회원가입)
        else:
            email = f"{uid}#$%{email}"
            URL = f"{URL_BACK}api/sign-up/"
            data = {
                'email': email,
                'username': username,
                'password': password,
            }
            requests.post(url=URL, data=data)

            user_info = User.objects.filter(email=email).first()
            social_user = SocialAccount(
                user=user_info,
                uid=uid,
                provider=provider
            )
            social_user.save()

            # 토큰 발급
            data = {
                'email': email,
                'password': password,
            }
            serializer = MyTokenObtainPairSerializer(data=data)
            try:
                serializer.is_valid(raise_exception=True)
            except TokenError as e:
                raise InvalidToken(e.args[0])

            return Response(serializer.validated_data, status=status.HTTP_200_OK)

    # db에 이메일이 존재하지 않는 경우 (소셜로그인으로 처음 로그인, db에 저장)
    else:
        URL = f"{URL_BACK}api/sign-up/"
        data = {
            'email': email,
            'username': username,
            'password': password,
        }
        requests.post(url=URL, data=data)

        user_info = User.objects.filter(email=email).first()
        # user_info = User.objects.get(email=email)
        social_user = SocialAccount(
            user=user_info,
            uid=uid,
            provider=provider
        )
        social_user.save()

        # 로그인 시 토큰 발급
        data = {
            'email': email,
            'password': password,
        }
        serializer = MyTokenObtainPairSerializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


# @api_view(["GET"])
# def google_login(request):
#     GOOGLE_CLIENT_ID = getattr(settings, "GOOGLE_CLIENT_ID")
#     REDIRECT_URI = GOOGLE_CALLBACK_URI
#     scope = "https://www.googleapis.com/auth/userinfo.email"

#     return redirect(f"https://accounts.google.com/o/oauth2/v2/auth?client_id={GOOGLE_CLIENT_ID}&response_type=code&redirect_uri={REDIRECT_URI}&scope={scope}")


# def google_callback(request):
#     GOOGLE_CLIENT_ID = getattr(settings, "GOOGLE_CLIENT_ID")
#     GOOGLE_SECRET = getattr(settings, "GOOGLE_SECRET")
#     REDIRECT_URI = GOOGLE_CALLBACK_URI
#     state = request.GET.get('state')
#     code = request.GET.get('code')

#     # 구글에 요청해서 token data 가져오기
#     token_data = requests.post(
#         f"https://oauth2.googleapis.com/token?client_id={GOOGLE_CLIENT_ID}&client_secret={GOOGLE_SECRET}&code={code}&grant_type=authorization_code&redirect_uri={REDIRECT_URI}&state={state}").json()

#     error = token_data.get("error", None)
#     if error is not None:
#         raise JSONDecodeError(error)

#     access_token = token_data.get("access_token")
#     # 발급된 Access Token을 이용해서 사용자 정보 가져오기
#     get_user_info = requests.get(
#         f"https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={access_token}")

#     status_code = get_user_info.status_code  # 제대로 들어가면 200 반환

#     if status_code != 200:
#         return JsonResponse(
#             {'err_msg': 'failed to get email'},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     user_info_json = get_user_info.json()  # json형태로 프로필 값 가져오기
#     return Response(user_info_json)
#     '''
#     {
#         "issued_to": "775963563051-uv8t5d689e6eerchgedpdu2f36bthj45.apps.googleusercontent.com",
#         "audience": "775963563051-uv8t5d689e6eerchgedpdu2f36bthj45.apps.googleusercontent.com",
#         "user_id": "112901936700065846512",
#         "scope": "https://www.googleapis.com/auth/userinfo.email openid",
#         "expires_in": 3598,
#         "email": "ksge1124@gmail.com",
#         "verified_email": true,
#         "access_type": "online"
#     }
#     '''

#     # 이메일과 이름 데이터 가져옴
#     # (구글에는 이름 데이터가 없다. 로그인 시 닉네임 작성하는 화면 반환 : 프론트)

#     email = user_info_json.get('email')
#     # return HttpResponse(email)  # test : 확인

#     '''db에 이미 저장되어있는 회원인지 확인'''
#     try:
#         user = User.objects.get(email=email)
#         social_user = SocialAccount.objects.get(
#             user=user)  # 소셜로그인으로 회원가입 했는지 여부 확인

#         # 이메일은 있지만 social user가 아님
#         if social_user is None:
#             return JsonResponse({'err_msg': 'email exists but not social user'}, status=status.HTTP_400_BAD_REQUEST)

#         # google에서 찾을 수 없음
#         if social_user.provider != 'google':
#             return JsonResponse({'err_msg': 'no matching social type'}, status=status.HTTP_400_BAD_REQUEST)

#         # 기존에 Google로 가입된 유저
#         data = {'access_token': access_token, 'code': code}
#         accept = requests.post(
#             f"{BASE_URL}api/login/google/finish/", data=data)

#         accept_status = accept.status_code

#         if accept_status != 200:
#             return JsonResponse({'err_msg': 'failed to signin'}, status=accept_status)

#         accept_json = accept.json()
#         accept_json.pop('user', None)

#         # return JsonResponse(accept_json)
#         # jwt토큰 프론트엔드에 전달
#         return JsonResponse(
#             {
#                 "access_token": access_token,
#                 "user_email": email,
#             },
#             status=200,
#         )

#     except User.DoesNotExist:
#         data = {'access_token': access_token, 'code': code}
#         accept = requests.post(
#             f"{BASE_URL}api/login/google/finish/", data=data)
#         accept_status = accept.status_code

#         if accept_status != 200:
#             return JsonResponse({'err_msg': 'failed to signup'}, status=accept_status)

#         accept_json = accept.json()
#         accept_json.pop('user', None)

#         # return JsonResponse(accept_json)
#         # jwt토큰 프론트엔드에 전달
#         return JsonResponse(
#             {
#                 "access_token": access_token,
#                 "user_email": email,
#             },
#             status=200,
#         )


# class GoogleLogin(SocialLoginView):
#     adapter_class = google_view.GoogleOAuth2Adapter
#     callback_url = GOOGLE_CALLBACK_URI
#     client_class = OAuth2Client


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class MyTokenRefreshView(TokenViewBase):
    serializer_class = MyTokenRefreshSerializer

# refresh 토큰을 blacklist로 올리는 api


class LogoutView(GenericAPIView):
    serializer_class = RefreshTokenSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args):
        sz = self.get_serializer(data=request.data)
        sz.is_valid(raise_exception=True)
        sz.save()
        return Response("로그아웃 성공", status=status.HTTP_204_NO_CONTENT)
