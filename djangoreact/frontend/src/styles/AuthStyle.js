import styled from 'styled-components';
import { mainPink, palePink, warningSign } from './color';

const loginWidth = '85%';
const loginheight = '2rem';
const marginBottom = '0.313rem';

export const AuthPage = styled.div`
  padding-top: 5vh;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 70vh;
  width: 26%;
  margin: 0 auto;
  padding: 1rem 0;
  border-radius: 0.625rem;
  text-align: center;
  background-color: white;
  .autoLoginBox {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    input {
      width: 5%;
    }
  }
  @media screen and (max-width: 48rem) {
    width: 90%;
    height: 80vh;
  }
  @media screen and (min-width: 106rem) {
    width: 20%;
  }
`;

export const AuthTitle = styled.h1`
  text-align: start;
  font-size: 2rem;
  width: ${loginWidth};
  margin: ${marginBottom} auto;
`;

export const LineBox = styled.div`
  position: relative;
  width: ${loginWidth};
  margin: 0 auto ${marginBottom};
  display: flex;
  justify-content: center;
`;

export const Or = styled.div`
  background-color: white;
  width: 30%;
  font-size: 1rem;
  font-weight: 500;
`;

export const Button = styled.button`
  display: flex;
  justify-content: space-evenly;
  width: ${loginWidth};
  margin: 0.313rem auto 1.25rem;
  padding: 0.313rem;
  border: none;
  border-radius: 10px;
  position: relative;
  color: black;
  font-size: 20px;
  cursor: pointer;
  background-color: ${(props) => {
    if (props.className === 'unactiveBtn') {
      return 'lightgrey';
    }
    return mainPink;
  }};
  > img {
    position: absolute;
    left: 0.25em;
    height: ${loginheight};
    padding: 0;
    margin: 0;
  }
`;

export const KakaoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  > div {
    margin: ${marginBottom} auto;
    width: ${loginWidth};
    margin-bottom: 2%;

    > input {
      padding: 0.625rem;
      width: 100%;
      border: 0.125rem solid ${palePink};
      border-radius: 10px;
      &:focus {
        outline: 0.125rem solid ${mainPink};
        background-color: rgba(225, 193, 241, 0.2);
      }
    }
    > h3 {
      width: ${loginWidth};
      text-align: start;
    }
  }
`;

export const AuthFooterBox = styled.div`
  display: flex;
  flex-direction: column;
  width: ${loginWidth};
  margin: 0 auto;
  > div + div {
    margin-top: 0.313rem;
  }
`;

export const AuthFooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${marginBottom} 0;
  font-size: 0.875em;
  .question {
    text-align: start;
  }
  .toButton {
    color: blue;
    font-weight: 600;
    text-align: end;
  }
`;

export const ValidMessage = styled.p`
  width: ${loginWidth};
  margin: 0 auto ${marginBottom};
  color: ${warningSign};
  font-size: 0.9rem;
  font-weight: 700;
`;
