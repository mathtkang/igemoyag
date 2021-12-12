import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login } from '../redux/authSlice';
import Loader from '../components/Loader';

const Social = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(async () => {
    const code = new URL(window.location.href).searchParams.get('code');
    const KAKAKO_LOGIN = `http://localhost:8000/api/login/kakao/?code=${code}`;
    const autoLogin = sessionStorage.getItem('autoLogin');
    console.log(typeof code);

    try {
      const { data } = await axios.post(KAKAKO_LOGIN, code);
      const { username, access, refresh } = data;

      if (access) {
        axios.defaults.headers.common.Authorization = `Bearer ${access}`;
        dispatch(login({ username, access }));
        alert('로그인 되었습니다');
        navigate('/');
      }
      if (autoLogin) {
        localStorage.setItem('refresh', refresh);
      } else {
        sessionStorage.setItem('refresh', refresh);
      }
    } catch (error) {
      console.log(error);
      alert('이미 가입된 이메일입니다. 로그인 해주세요!');
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
