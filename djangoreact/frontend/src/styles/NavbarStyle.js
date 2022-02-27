import styled from 'styled-components';
import { mainPink, palePink } from './color';

export const NavBox = styled.div`
  height: 8vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  right: 0;
  position: fixed;
  z-index: 2;
  padding: 0.313rem 15vw 0.313rem 0;
  svg {
    cursor: pointer;
    width: 2.25rem;
    height: 2.25rem;
  }
  @media screen and (max-width: 48rem) {
    padding: 0.313rem 10vw 0.313rem 0;
    svg {
      cursor: pointer;
      width: 2rem;
      height: 2rem;
    }
  }
`;

export const MenuBox = styled.nav`
  background-color: white;
  width: 20vw;
  height: 100vh;
  display: flex;
  position: fixed;
  z-index: 3;
  top: 0;
  right: ${(props) => (props.active ? '0' : '-100%')};
  box-shadow: -3px 0px 4px 2px rgba(0, 0, 0, 0.4);
  transition: 500ms;
  @media screen and (max-width: 48rem) {
    width: 90%;
    trnsition: 300ms;
  }
`;

export const MenuBoxContent = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 0;
  padding: 0.313rem 0.938rem 0;
  width: 100%;

  div {
    width: 100%;
    &:first-child {
      margin-bottom: 1rem;
    }
  }

  a {
    width: 100%;
  }

  .navTogle {
    cursor: pointer;
    display: flex;
    justify-content: start;
    svg {
      width: 3.25rem;
      height: 3.25rem;
    }
  }
  h3 {
    width: 100%;
    padding-bottom: 0.313rem;
    font-size: 1.5rem;
    border-bottom: 3px solid ${mainPink};
    margin: 1rem 0;
    color: rgba(0, 0, 0, 0.7);
  }
  span {
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
  }
`;

export const ContentBox = styled.div`
  display: flex;
  height: 35%;
  flex-direction: column;
  font-size: 1.125rem;
  font-weight: 600;
  li {
    width: 100%;
    height: 18%;
    border-radius: 5px;
    background-color: ${palePink};
    margin-bottom: 0.938rem;
    &:hover {
      background-color: ${mainPink};
      transform: scale(1.02);
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    .pillBox {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
  button {
    cursor: pointer;
    height: 15%;
    width: 100%;
    font-size: 1.125rem;
    font-weight: 600;
    outline: none;
    border-radius: 5px;
    border: none;
    background-color: blue;
    color: white;
    &:hover {
      transform: scale(1.02);
    }
  }
`;
