import styled from 'styled-components';
import { palePink, lightYellow, lightGreen } from './color';

export const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 2rem;
  > h1 {
    font-size: 1.25em;
    margin-bottom: 0.5em;
    color: white;
  }
  div {
    transition: 500ms;
  }

  @media screen and (max-width: 48rem) {
    width: 100%;
    font-size: 1.75rem;
    > h1 {
      font-size: 1.25em;
      margin-bottom: 0.313em;
      color: white;
    }
  } ;
`;

export const Box = styled.div`
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(2, 1fr);
  place-items: center;
  width: 55vh;
  height: 55vh;
  border: 0.781em solid white;
  border-radius: 15%;
  div {
    cursor: pointer;
  }
  @media screen and (max-width: 48rem) {
    width: 70vw;
    height: 70vw;
  } ;
`;

export const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 75%;
  height: 75%;

  img {
    width: 100%;
  }
  div {
    display: none;
  }

  :hover {
    background-color: white;
    /* box-shadow: 3px 2px 2px 2px rgba(0, 0, 0, 0.3); */
    img {
      display: none;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 0.5em;
      font-weight: 600;
      color: ${palePink};
      svg {
        width: 3em;
        height: 3em;
        margin-bottom: 0.313em;
      }
    }
  }
  @media screen and (max-width: 48rem) {
    background-color: white;
    /* box-shadow: 3px 2px 10px 3px gray; */
    img {
      display: none;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 0.5em;
      font-weight: 600;
      color: ${palePink};
      svg {
        width: 2.5em;
        height: 2.5em;
        margin-bottom: 0.313em;
      }
    }
  }
`;

export const OtherThings = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => {
    if (props.team) {
      return `
        border-top: 0.813em solid ${lightYellow};
        border-right: 0.813em solid ${lightYellow};

        width: 55%;
        height: 55%;
      `;
    }
    return `
      border: 0.813em solid ${lightGreen};
      border-radius: 15%;

      width: 60%;
      height: 60%;
    `;
  }}

  div {
    display: none;
  }

  :hover {
    width: 75%;
    height: 75%;

    border: none;
    border-radius: 50%;
    background-color: ${(props) => (props.team ? lightYellow : lightGreen)};
    div {
      display: flex;
      font-size: 0.688em;
      font-weight: 600;
    }
  }
`;
