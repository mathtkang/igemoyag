# 이게모약 💊

<img width="200" alt="이게모약 logo" src="https://user-images.githubusercontent.com/51039577/234815308-25f289a3-b0ec-4e04-8b78-86945e5847ee.png">

<br>

## 📃 프로젝트 개요

- 간편하고 쉽게, 내 손 안의 작은 알약 사전
- AI 이미지 처리 기능을 활용해 알약 사진을 스캔하여, 알약을 구별하고 알약의 정보를 알려주는 서비스

<br>

## ⚙️ 개발 환경
- ![Visual Studio Code badge](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC.svg?style=flat&logo=Visual-Studio-Code&logoColor=white)
- ![github badge](https://img.shields.io/badge/GitHub-181717.svg?style=flat&logo=GitHub&logoColor=white)
- ![docker badge](https://img.shields.io/badge/Docker-2496ED.svg?style=flate&logo=Docker&logoColor=white)
- ![postman badge](https://img.shields.io/badge/postman-FF6C37?style=flat&logo=Postman&logoColor=white)

<br>

## 🛠 사용 기술

**Frontend**
- ![HTML5 badge](https://img.shields.io/badge/HTML5-E34F26.svg?&logo=HTML5&logoColor=white) ![CSS3 badge](https://img.shields.io/badge/CSS3-1572B6.svg?&logo=CSS3&logoColor=white)
- ![Axios badge](https://img.shields.io/badge/Axios-5A29E4.svg?&logo=Axios&logoColor=white)
- ![React badge](https://img.shields.io/badge/React-61DAFB.svg?&logo=React&logoColor=black)
- ![React-Router badge](https://img.shields.io/badge/React%20Router-CA4245.svg?&logo=React-Router&logoColor=white)
- ![Redux-toolkit badge](https://img.shields.io/badge/Redux%20toolkit-764ABC.svg?&logo=Redux&logoColor=white)
- ![Styled-Components badge](https://img.shields.io/badge/Styled%20Components-DB7093.svg?&logo=styled-components&logoColor=white)

**Backend**
- ![python badge](https://img.shields.io/badge/Python-3776AB?&logo=Python&logoColor=white)
- ![django badge](https://img.shields.io/badge/Django-%23092E20?&logo=Django&logoColor=white)

**Database**
- ![Postgres badge](https://img.shields.io/badge/postgres-%23316192.svg?&logo=postgresql&logoColor=white)

**AI**
- ![TensorFlow badge](https://img.shields.io/badge/TensorFlow-FF6F00.svg?&logo=TensorFlow&logoColor=white)
- ![Keras.Resnet badge](https://img.shields.io/badge/Keras.Resnet-D00000.svg?&logo=Keras&logoColor=white)
- ![NVIDIA.CUDA badge](https://img.shields.io/badge/NVIDIA.CUDA-76B900.svg?&logo=NVIDIA&logoColor=white)

**Data Collection**
- ![Selenium badge](https://img.shields.io/badge/Selenium-43B02A.svg?&logo=Selenium&logoColor=white)
- ![BeautifulSoup badge](https://img.shields.io/badge/BeautifulSoup-43B02A.svg?&&logoColor=white)
- ![Pandas badge](https://img.shields.io/badge/pandas-150458.svg?&logo=pandas&logoColor=white)

**VM & Deploy**
- ![Azure badge](https://img.shields.io/badge/Azure-0078D4.svg?&logo=Microsoft-Azure&logoColor=white)
- ![docker badge](https://img.shields.io/badge/Docker-%232496ED?&logo=Docker&logoColor=white)
- ![nginx badge](https://img.shields.io/badge/Nginx-%23009639?logo=NGINX&locoColor=white)
- ![Gunicorn badge](https://img.shields.io/badge/Gunicorn-499848.svg?style=flat&logo=Gunicorn&logoColor=white)

<br>

<details> <summary> 👉 해당 기술 선정 이유</summary>
<br>
1️⃣ Frontend

- ![React badge](https://img.shields.io/badge/React-61DAFB.svg?&logo=React&logoColor=black)
    : 개발 생산성과 유지 보수를 위해 컴포넌트 단위로 작업을 하는 리액트를 사용하기로 했습니다.
- ![Redux-toolkit badge](https://img.shields.io/badge/Redux%20toolkit-764ABC.svg?&logo=Redux&logoColor=white) 
    : 사용자가 로그인했을 경우 로그인 인증 상태 관리를 전역으로 하기 위하여 redux를 사용하였고, redux를 보일러플레이트 없이 편리하게 사용하기 위해 redux-toolkit을 사용하였습니다.
- ![Styled-Components badge](https://img.shields.io/badge/Styled%20Components-DB7093.svg?&logo=styled-components&logoColor=white)
    : 여러 페이지에 들어가는 button, box, container들을 하나로 통합하여 꺼내 사용하기 편리하도록 styles라는 폴더 안에 styled-components를 정리하였습니다.
- ![Axios badge](https://img.shields.io/badge/Axios-5A29E4.svg?&logo=Axios&logoColor=white)
    : 서버에 알약 데이터를 요청하고 받기 위하여 axios get/post를 사용하였습니다.

2️⃣ Backend & Database & Deploy
- ![django badge](https://img.shields.io/badge/Django-%23092E20?&logo=Django&logoColor=white)
    : 반복적으로 구현해야하는 부분들이 이미 만들어져있고, 강력한 라이브러리들이 많기 때문에 앱의 확장성을 고려해서 장고 웹 프레임워크를 선택하게 되었습니다.
- ![Postgres badge](https://img.shields.io/badge/postgres-%23316192.svg?&logo=postgresql&logoColor=white)
    : 장고와 함께 쓰기 좋은 관계형 데이터베이스(RDB)로, 영구적인 무료 데이터베이스이며 앞으로의 사용성 증가를 고려하여 사용했습니다.
- ![docker badge](https://img.shields.io/badge/Docker-%232496ED?&logo=Docker&logoColor=white)
    : 협업시, 개발자의 운영체제와 상관없이 동일한 환경에서 개발을 진행하기 위해 사용했습니다.

3️⃣ AI & Data collection
- ![TensorFlow badge](https://img.shields.io/badge/TensorFlow-FF6F00.svg?&logo=TensorFlow&logoColor=white)
    : 이미지 인식에 주로 사용되며, 사용자가 많아 정보를 보다 쉽게 찾을 수 있고, 내부에 Keras를 통하여 보다 쉽게 모델을 구현 할수 있습니다.
- ![Keras.Resnet badge](https://img.shields.io/badge/Keras.Resnet-D00000.svg?&logo=Keras&logoColor=white)
    : CNN모델 중에서 층을 높게 쌓아도 성능이 좋고, 오류율 또한 낮은 모델로 많은 종류의 알약을 분류하는데 적합하다고 생각하였습니다.
- ![NVIDIA.CUDA badge](https://img.shields.io/badge/NVIDIA.CUDA-76B900.svg?&logo=NVIDIA&logoColor=white)
    : GPU를 통하여 많은 양의 이미지를 학습시키는데 시간을 줄일 수 있도록 사용하였습니다.
- ![BeautifulSoup badge](https://img.shields.io/badge/BeautifulSoup-43B02A.svg?&&logoColor=white)
    : 파이썬의 라이브러리로 데이터 수집에 필요한 크롤링 작업을 하는데 용이하므로 사용하였습니다.
- ![Selenium badge](https://img.shields.io/badge/Selenium-43B02A.svg?&logo=Selenium&logoColor=white)
    : 웹페이지가 동적으로 변경되는 경우 beauifulsoup만으로는 크롤링에 한계가 있어서 사용하였습니다.
</details>


<br>

## 📙 API 명세서
### 📑 [API Specification](https://sprinkle-piccolo-9fc.notion.site/API-Specification-gbzr-c287814a50c5452da4d9c2234c2adf75)

<br>

## 📋 E-R Diagram
<img width="1000" alt="ERD" src="https://user-images.githubusercontent.com/51039577/234810851-2de392fb-d9f9-451d-a8d0-62d66f9b1880.png">

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
의료진은 입원 환자가 사전에 복용하고 있던 지참약을 조사하는데 많은 시간이 소요하게 됩니다. <br>
<br>
1.  의료진은 입원 환자가 입원 전 복용하고 있던 약을 필수로 조사해야 합니다. <br>
2.  만성 질환자의 경우 복용약의 가짓수가 많기 때문에 조사에 많은 시간이 소요됩니다. <br>
3.  인구 고령화에 따라 만성 질환자 수가 증가하여 지참약 조사에 많은 시간이 소요됩니다. <br>
4.  환자별로 복용약 가짓수, 복용법, 보관 방법 등이 천차만별이기에 많은 시간이 소요됩니다. <br>
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

## 📂 Page Structure
<img width="800" alt="Page Structure" src="https://user-images.githubusercontent.com/51039577/235060493-2452a608-0a8b-4801-96e1-beffe2787b2f.png">

<br>

## 💻 프로젝트 화면 구성

| ![메인 페이지](https://user-images.githubusercontent.com/51039577/235062849-3d977a4e-6c91-4c70-8c06-a71601dec4aa.png) | ![메인 페이지(햄버거메뉴)](https://user-images.githubusercontent.com/51039577/235062839-093e27b1-9e4f-4758-bfdd-31d87d2a2924.png) | ![회원가입](https://user-images.githubusercontent.com/51039577/235062852-3c6ee161-f8d1-40ea-a2f8-2b41fc340e48.png) | ![로그인](https://user-images.githubusercontent.com/51039577/235062854-651a10a6-6a88-48dd-997e-037673ad9195.png) | ![메인 페이지(로그인 이후)](https://user-images.githubusercontent.com/51039577/235062858-f4b2c249-c07e-46f1-bebc-13a34125cf39.png) |
| :--------: | :--------: | :--------: | :---------: | :---------: |
| 메인 페이지 | 메인 페이지(햄버거메뉴) | 회원가입 | 로그인 | 메인 페이지(로그인 이후) |

<br>

| ![사진으로 검색 1](https://user-images.githubusercontent.com/51039577/235062860-ef54443c-ad49-405c-9c58-d68a15899362.png) | ![사진으로 검색 2](https://user-images.githubusercontent.com/51039577/235062863-4cc38068-a80e-4f79-828f-80860c8e589c.png) | ![사진으로 검색 로딩 중](https://user-images.githubusercontent.com/51039577/235062866-3dd363e4-bb42-485f-82a1-60a5ee81dc2c.png) | ![사진 검색 결과](https://user-images.githubusercontent.com/51039577/235062869-55ae87ab-389d-48b4-bc0d-9569ef41b2c1.png) | ![알약 상세 페이지](https://user-images.githubusercontent.com/51039577/235062870-4302b62c-446c-41d7-8b2a-6a853e0bd82a.png) | 
| :--------: | :--------: | :--------: | :---------: | :---------: |
| 사진으로 검색 페이지 1 | 사진으로 검색 2 | 사진으로 검색 로딩 중 | 사진 검색 결과 | 알약 상세 페이지 |

<br>

| ![직접 검색 페이지](https://user-images.githubusercontent.com/51039577/235062873-b79a64d6-5e68-4a1c-8e70-8abebdfd08c8.png) | ![직접 검색 결과](https://user-images.githubusercontent.com/51039577/235062876-76a90de0-4471-4fdd-90b3-20d79972c91a.png) | ![알약 상세 페이지](https://user-images.githubusercontent.com/51039577/235064613-42e04f7e-2ac2-4180-a8f9-ef36bda3f8ef.png) | ![알약 상세 페이지(더보기)](https://user-images.githubusercontent.com/51039577/235064620-1f4a2b70-9406-4179-a405-2d835c3b5608.png) | ![내 알약 상자(최근 검색 기록)](https://user-images.githubusercontent.com/51039577/235062879-ce3eb4a4-d612-4b59-ae44-9e41b1581756.png) | ![내 알약 상자(즐겨찾기)](https://user-images.githubusercontent.com/51039577/235062882-299af43f-3426-49d4-9b82-c5f7c642e904.png) | 
| :--------: | :--------: | :--------: | :---------: | :---------: | :---------: |
| 직접 검색 페이지 | 직접 검색 결과 | 알약 상세 페이지 | 알약 상세 페이지(더보기) | 내 알약 상자(최근 검색 기록) | 내 알약 상자(즐겨찾기) |

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
