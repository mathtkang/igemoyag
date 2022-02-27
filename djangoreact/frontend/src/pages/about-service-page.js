/* eslint-disable  no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import WhiteNavbar from '../components/WhiteNavbar';
import { mainPink } from '../styles/color';

const Section = ({ num }) => {
  const imgURL = `service/service_${num}.png`;
  return (
    <ImgBox className="section">
      <ContentImg src={imgURL} alt="url" />
    </ImgBox>
  );
};

const serviceList = [1, 2, 3, 4, 5, 6, 7];

const AboutServicePage = () => {
  return (
    <>
      <WhiteNavbar />
      <AboutServiceContainer>
        {serviceList.map((num) => {
          return <Section num={num} />;
        })}
        <button
          type="button"
          onClick={() => {
            window.location.href = '/';
          }}
        >
          이게모약 이용하기
        </button>
      </AboutServiceContainer>
    </>
  );
};

export default AboutServicePage;

const AboutServiceContainer = styled.div`
  position: relative;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    position: absolute;
    bottom: 1%;
    font-size: 1.25rem;
    border: none;
    border-radius: 5px;
    outline: none;
    padding: 0.313em 2em;
    color: white;
    background-color: ${mainPink};
    box-shadow: 1px 2px 3px 2px rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
  @media only screen and (max-width: 48rem) {
    button {
      font-size: 0.625em;
      padding: 0.313em 1em;
    }
  }
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  width: 70%;
  box-sizing: border-box;
  @media only screen and (max-width: 48rem) {
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;

const ContentImg = styled.img`
  height: 100%;
  overflow: hidden;
`;
