import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login } from '../redux/authSlice';
import Loader from '../components/Loader';
import { REACT_APP_HOST_IP_ADDRESS } from '../env';

const Social = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(async () => {
    const code = new URL(window.location.href).searchParams.get('code');
<<<<<<< HEAD
    // const KAKAKO_LOGIN = `http://localhost:8000/api/login/kakao/?code=${code}`;
    const KAKAKO_LOGIN = 'http://localhost:8000/api/login/kakao/';
=======
>>>>>>> e2702e04
    const autoLogin = sessionStorage.getItem('autoLogin');
    try {
      const { username, access, refresh } = data;

      if (access) {
        axios.defaults.headers.common.Authorization = `Bearer ${access}`;
        dispatch(login({ username, access }));
        alert('로그인 되었습니다');
        if (autoLogin) {
          localStorage.setItem('refresh', refresh);
        } else {
          sessionStorage.setItem('refresh', refresh);
        }
        navigate('/');
      }
    } catch (error) {
      alert('에러가 발생했습니다. 다시 로그인 해주세요');
      navigate('/login');
    }
  }, []);

  return (
    <SocialPage>
      <h1>카카오톡 로그인 중...</h1>
      <Loader />
    </SocialPage>
  );
};

export default Social;

const SocialPage = styled.div`
  @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
    padding-top: 20vh;
  }
  padding-top: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
`;
