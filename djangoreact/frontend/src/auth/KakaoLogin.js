import React from 'react';
import styled from 'styled-components';

const KakaoLogin = () => {
  const CLIENT_ID = 'a99d9ab952d8ff978691e6981a20b3f4';
  const REDIRECT_URI = 'http://elice-kdt-2nd-team6.koreacentral.cloudapp.azure.com/oauth/callback/kakao';
  const KAKAO_OAUTH_URI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <KakaoContainer href={KAKAO_OAUTH_URI}>
      <img src="image/kakao.png" alt="카카오로고" />
      카카오 로그인
    </KakaoContainer>
  );
};

export default KakaoLogin;

const KakaoContainer = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85%;
  height: 2.5rem;
  border-radius: 12px;
  background-color: #fee500;
  font-weight: 600;
  img {
    height: 35%;
    margin-right: 0.625rem;
  }
`;
