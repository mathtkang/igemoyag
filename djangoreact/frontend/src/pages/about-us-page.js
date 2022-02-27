import React from 'react';
import styled from 'styled-components';
import { memberList } from '../helper/memberList';
import { AboutUs } from '../components/AboutUs';
import WhiteNavbar from '../components/WhiteNavbar';

const AboutUsPage = () => {
  return (
    <>
      <WhiteNavbar />
      <PageContainer className="about_us_box">
        <h1 className="about_us_box_header">머슴러닝</h1>
        <h2 id="about_subtitle">팀원의 카드를 클릭해보세요!</h2>
        <BoxContainer className="about_us_box_main">
          {memberList.map((item) => (
            <AboutUs
              key={item.id}
              engName={item.engName}
              name={item.name}
              position={item.position}
              mbti={item.mbti}
              url={item.url}
              email={item.email}
              blog={item.blog}
              comment={item.comment}
            />
          ))}
        </BoxContainer>
      </PageContainer>
    </>
  );
};

export default AboutUsPage;

const PageContainer = styled.div`
  display: flex;
  width: 100vw;
  padding-top: 15vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
    font-size: 3.5rem;
    margin-bottom: 1.25rem;
  }
  h2 {
    margin-bottom: 1.25rem;
  }
  #about_subtitle {
    margin-bottom: 2.5rem;
    color: rgba(0, 0, 0, 0.8);
  }

  @media only screen and (max-width: 48rem) {
    h1 {
      color: white;
      font-size: 2rem;
      margin-bottom: 0.625rem;
    }
    #about_subtitle {
      padding: 0 10px;
      font-size: 1rem;
      margin-bottom: 0.625rem;
      color: rgba(0, 0, 0, 0.8);
    }
  } ;
`;

const BoxContainer = styled.div`
  width: 70%;
  max-width: 1100px;
  display: flex;
  flex-wrap: wrap;
`;
