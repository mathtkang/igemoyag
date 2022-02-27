import styled from 'styled-components';
import { mainPink, palePink, lightYellow } from './color';

export const SearchPage = styled.div`
  min-height: 100vh;
  padding-top: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 5vh;
  h1 {
    font-size: 2rem;
    padding: 0 15vw;
    width: 100%;
    color: white;
    margin-bottom: 1.25rem;
  }
  .count_result {
    margin: 1.5rem 0;
    font-size: 1.25em;
  }
  @media screen (min-width: 48.01rem) and (max-width: 81.25rem) {
    font-size: 0.75rem;
  }
  @media screen and (max-width: 48rem) {
    font-size: 0.625rem;
    h1 {
      padding: 0 10vw;
    }
  }
`;

export const SearchBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 15vw;
  h2 {
    font-size: 1.625em;
    color: ${mainPink};
  }
  > div + div {
    margin-top: 1.25\rem;
  }
  @media screen and (max-width: 48rem) {
    padding: 0 10vw;
  }
`;

export const NameBox = styled.div`
  display: flex;
  justify-content: space-space-evenly;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  padding: 1em 5%;
  background-color: white;
  h2 {
    flex-shrink: 0;
  }
  input {
    width: 100%;
    height: 1.625em;
    border: 2px solid ${palePink};
    border-radius: 5px;
    font-size: 1.25em;
    font-weight: 700;
    margin-left: 4%;
    padding: 0.5em;
    &:focus {
      outline: 0.125rem solid ${mainPink};
      background-color: rgba(225, 193, 241, 0.2);
    }
  }
`;

export const NonNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  padding: 1.667em 5%;
  h2 {
    margin-bottom: 0.625em;
  }
  background-color: white;
  > div + div {
    margin-top: 1.5em;
  }
`;

export const ShapeColorBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  overflow: auto;
  > div + div {
    margin-left: 0.313em;
  }
  span {
    flex-shrink: 0;
    margin-right: 0.625em;
    color: ${mainPink};
    font-size: 1.25em;
    font-weight: 700;
    min
  }
`;

export const SelectBox = styled.div`
  display: flex;
  font-weight: 600;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.8);
  flex-shrink: 0;

  justify-content: center;
  align-items: center;
  border: 2px solid ${palePink};
  border-radius: 10px;

  min-width: 60px;
  min-height: 60px;

  cursor: pointer;

  background-color: ${(props) => {
    if (props.className === 'checked') {
      return `${palePink}`;
    }
    return 'white';
  }};
  color: ${(props) => {
    if (props.className === 'checked') {
      return 'white';
    }
    return 'black';
  }};
  box-shadow: ${(props) => {
    if (props.className === 'checked') {
      return '-2px 0px 4px rgba(0,0,0,0.5)';
    }
    return '';
  }};

  div {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    border: 1px solid black;
    background-color: ${(props) => props.id};
    margin-bottom: 1px;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  button {
    border: none;
    border-radius: 5px;
    background-color: white;
    width: 22%;
    height: 2em;
    font-size: 1.25em;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
    cursor: pointer;
    &:hover {
      background-color: ${lightYellow};
      transform: scale(1.01);
    }
  }
  @media screen and (max-width: 48rem) {
    justify-content: space-between;
    button {
      width: 40%;
    }
  }
`;
