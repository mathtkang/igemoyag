
# 이게모약 💊

<img width="200" alt="이게모약 logo" src="https://user-images.githubusercontent.com/51039577/234815308-25f289a3-b0ec-4e04-8b78-86945e5847ee.png">

<!-- ## 🚀 [서비스 접속하기]()
❗️ 현재 비용의 문제로 서버 접속은 불가능합니다. -->

<br>

## 📃 프로젝트 개요

- 간편하고 쉽게, 내 손 안의 작은 알약 사전
- AI 이미지 처리 기능을 활용해 알약 사진을 스캔하여, 알약을 구별하고 알약의 정보를 알려주는 서비스

<br>

## ⚙️ 개발 환경
<!-- - ![macosm1 badge](https://img.shields.io/badge/MacOS%20M1-000000.svg?style=flat&logo=macOS&logoColor=white) -->
- ![Visual Studio Code badge](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC.svg?style=flat&logo=Visual-Studio-Code&logoColor=white)
- ![github badge](https://img.shields.io/badge/GitHub-181717.svg?style=flat&logo=GitHub&logoColor=white)
- ![docker badge](https://img.shields.io/badge/Docker-2496ED.svg?style=flate&logo=Docker&logoColor=white)
- ![postman badge](https://img.shields.io/badge/postman-FF6C37?style=flat&logo=Postman&logoColor=white)
<!-- - ![swagger badge](https://img.shields.io/badge/Swagger-85EA2D.svg?style=flat&logo=Swagger&logoColor=black) -->

<br>

## 🛠 사용 기술

**Backend**
- ![python badge](https://img.shields.io/badge/Python-3.10-3776AB?style=flat&logo=Python&logoColor=white)
- ![django badge](https://img.shields.io/badge/Django-3.2.9-%23092E20?&logo=Django&logoColor=white)


**Frontend**
<!-- 여기작성 -->



**Database**
- ![Postgres badge](https://img.shields.io/badge/postgres-14.5-%23316192.svg?style=flat&logo=postgresql&logoColor=white)


**Deploy**
- ![aws ec2 badge](https://img.shields.io/badge/AWS-EC2-%23FF9900?&logo=Amazon%20EC2&logoColor=white)
- ![docker badge](https://img.shields.io/badge/Docker-20.10.17-%232496ED?&logo=Docker&logoColor=white)
- ![nginx badge](https://img.shields.io/badge/Nginx-1.23.0-%23009639?logo=NGINX&locoColor=white)
- ![Gunicorn badge](https://img.shields.io/badge/Gunicorn-499848.svg?style=flat&logo=Gunicorn&logoColor=white)


<br>

## 📙 API 명세서
### 👉 [📑 API Specification](https://sprinkle-piccolo-9fc.notion.site/API-Specification-gbzr-c287814a50c5452da4d9c2234c2adf75)
<!-- <img width="1176" alt="api 명세서" src=""> -->

<br>

## 📋 E-R Diagram
<img width="1000" alt="ERD" src="https://user-images.githubusercontent.com/51039577/234810851-2de392fb-d9f9-451d-a8d0-62d66f9b1880.png">



<!-- ## ✅ Test Case -->

<br>

## 🕸 System Architecture

<img width="1000" alt="System Architecture" src="https://user-images.githubusercontent.com/51039577/234815256-3921b4ba-8f00-4a28-9c63-db5d086c198e.png">

<br>

## 📂 Directory Structure

<img width="200" alt="Directory Structure" src="https://user-images.githubusercontent.com/51039577/234831315-4c449f0e-751e-4a0e-a444-6e1a0f586b57.png">

<br>

## 🌍 배포

Docker, NginX, Gunicorn을 사용하여 AWS EC2 서버에 배포하였습니다.

➡️ [서비스 주소]()

❗️ 현재 비용의 문제로 서버 접속은 불가능합니다.

<br>
<br>
<br>
<br>

# 💊 이게모약 서비스 소개

## 🥅 프로젝트 목표

- **사진 한장으로 알약 정보** **검색이 가능**하도록 합니다.
- 알약 정보 직접 검색을 통해 알약의 이름, 색상, 모양으로 알약 정보를 검색할 수 있습니다.
- **알약 즐겨찾기 기능**을 통해 서비스 내 기능인 '내 알약 상자' 페이지에서 **복용 중인 알약을 쉽게 관리**하도록 합니다.
- 알약 즐겨찾기 기능 페이지에 있는 **알약들을 한 장의 사진으로 리스트업** 할 수 있습니다.

<br>

<details> <summary>❓ 프로젝트 문제 상황</summary>
<br>
  의료진은 입원 환자가 사전에 복용하고 있던 지참약을 조사하는데 많은 시간이 소요하게 됩니다.
1.  의료진은 입원 환자가 입원 전 복용하고 있던 약을 필수로 조사해야 합니다.
2.  만성 질환자의 경우 복용약의 가짓수가 많기 때문에 조사에 많은 시간이 소요됩니다.
3.  인구 고령화에 따라 만성 질환자 수가 증가하여 지참약 조사에 많은 시간이 소요됩니다.
4.  환자별로 복용약 가짓수, 복용법, 보관 방법 등이 천차만별이기에 많은 시간이 소요됩니다.
</details>

<br>

## 💫 서비스 이용 시 기대효과
1. 의료진들의 자가 복용약 검색 시간 단축
2. 병원 방문이 잦은 사람들에게 약 정보 관리의 편리함 제공
3. 폐의약품 수거 방법을 모르는 일반인들에게 정보 제공
4. 일반 의약품에 대한 정보 제공 및 오남용 사례 제공으로 경각심 제공

<br>

## 🎯 Project Targets

1. Main Targets
    - 병동에서 입원 환자 복용약을 조사하는 의료진들
2. Sub Targets
    - 복용하는 약의 가짓 수가 많은 만성질환 환자 + 보호자들

<br>

## 💻 프로젝트 화면 구성

<!-- 여기 작성 -->



<br>
<br>




## ⭐️ 프로젝트 핵심 기능 (Main & Sub Features)

### Main Feature: 1️⃣ 약 검색
  1. 이미지로 약 검색하기
      - 유저에게 어떤 사진을 올려야하는지 가이드라인을 제시한다.
      - 유저가 사진을 올리면 인공지능 모델을 통해 검색한다.
      - 검색된 약에 관한 정보를 유저에게 제공한다.
      - 유저에게 제공되는 정보는 모두 동일 (약 종류, 성분, 함량, BIT 분류, 용법, 용량 , 효능, 효과, 부작용) 
  2. 약 이름으로 검색하기
      - 검색된 약에 관한 정보를 유저에게 제공한다.
  3. 모양, 색상별로 약 검색하기
      - 검색된 약에 관한 정보를 유저에게 제공한다.
### Main Feature: 2️⃣ 로그인
  1. 카카오톡 auth 기능
### Main Feature: 3️⃣ 내 알약 상자(로그인 시 이용 가능)
  1. 최근 검색한 알약 리스트
      - 로그인 후 알약을 검색할 시 최근 검색한 알약 기록이 남는다.
  2. 알약 즐겨찾기
      - 내 알약 상자에 담을 알약들을 즐겨찾기 기능으로 추가할 수 있다.
  3. 즐겨찾기 해놓은 알약 한장의 사진으로 정리해주기
      - 병원에 갈 일이 있을 경우, 즐겨찾기 해뒀던 알약들을 한 장의 이미지로 리스트업해서 정리해준다.

### Sub Feature : 1️⃣ 검색 알약 랭킹
  - 다른 유저들은 어떤 알약을 많이 검색했는지 알려준다.
### Sub Feature : 2️⃣ 폐의약품 수거 콘텐츠
  - 기간이 지나거나 복용할 수 없게 된 약들의 처리 방법을 알려준다.
  - 페이지를 나누어 콘텐츠로 제작 예정
### Sub Feature : 3️⃣ 일반 의약품 정보
  - 의사의 복용없이도 구매가 가능한 일반 의약품들의 정보를 알려준다.


<br>
<br>


## 👥 프로젝트 팀원 소개

| 이름 | 역할 |
| ---------- | ----------- |
| Nick(김태호) | (팀장)프론트엔드 개발 |
| Kaky(강경모) | 프론트엔드 개발 | 
| Sgaeng(강석영) | 백엔드 개발 |
| Cozy(김민지) | 백엔드 개발 |
| Mojito(김효곤) | 프론트엔드/백엔드 개발 |
| June(민경준) | 인공지능 |
