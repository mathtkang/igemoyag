import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigation = useNavigate();

  return (
    <FooterBox className="footer_box">
      <ExplanateBox className="footer_explanation">
        <div className="footer_explanation_navigation">
          <span
            role="button"
            tabIndex={0}
            onClick={() => {
              navigation('/about-service');
            }}
            onKeyDown={() => {
              navigation('/about-service');
            }}
          >
            서비스 기획 의도
          </span>
          <span
            role="button"
            tabIndex={0}
            onClick={() => {
              navigation('/about-us');
            }}
            onKeyDown={() => {
              navigation('/about-us');
            }}
          >
            팀원 소개
          </span>
        </div>
        <div id="team_info">
          <span>팀명 : 머슴러닝</span>
          <span>이메일 : igmy1108@gmail.com</span>
          <span>팀장 : 김태호</span>
          <span>팀원 : 강경모, 강석영, 김민지, 김효곤, 민경준</span>
        </div>
        <div id="team_vision">
          이게모약은 인공지능으로 알약을 손쉽게 찾아주는 서비스 입니다.
          <br />
          의료진은 환자 복용약 조사 시간을 줄일 수 있고, 환자는 복용약을 정리하고 정보를 확인할 수 있습니다. 의료진의
          업무 효율을 높여 한국 의료 서비스의 질을 향상시키자는 목표로 서비스를 기획하게 되었습니다.
        </div>
        <div id="copyright">Copyright 2021 이게모약 All rights reserved.</div>
      </ExplanateBox>
    </FooterBox>
  );
};

export default Footer;

const FooterBox = styled.div`
  display: flex;
  padding: 1rem 15vw;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  @media screen and (max-width: 48rem) {
    padding: 1rem 10vw;
  }
`;
const ExplanateBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 0.625rem;
  .footer_explanation_navigation {
      display: flex;
      justify-content: start;
      align-items: flex-start;
      width: 100%;
      list-style: none;
      padding: 0;
      margin: 10px 0;
      font-size: 0.625rem;
      font-weight: 700;
      span {
        margin-right: 0.625rem;
        cursor: pointer;
      }
    }
  }
  div {
    margin-bottom: 0.625rem;
    span {
      margin-right: 1rem;
    }
  }
  #copyright {
    font-weight: 800;
  }

  @media screen and (max-width: 48rem) {
    #team_info{
      span{
        display: block
      }
    }
  }
`;
