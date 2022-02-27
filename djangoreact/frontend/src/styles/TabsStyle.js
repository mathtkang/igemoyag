import styled from 'styled-components';
import { palePink } from './color';

export const Horizon = styled.hr`
  margin: 0.625rem auto;
`;

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  padding: 0 15vw;
  @media screen and (max-width: 48em) {
    width: 100%;
    padding: 0;
  }
`;

export const BlockTabs = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  button {
    width: 100%;
    cursor: pointer;
    box-shadow: 0px -1px 1px 1px rgba(0, 0, 0, 0.4);
    font-size: 1rem;
    font-weight: 600;
  }
  .tabs {
    background: ${palePink};
    border: none;
    position: relative;
    color: white;
  }

  .active-tabs {
    background: white;
    font-size: 1.25rem;
    border: none;
  }
  @media screen and (max-width: 48em) {
    .tabs,
    .active-tabs {
      font-size: 1.05rem;
    }
  }
`;

export const ContentTabs = styled.div`
  .content {
    background: white;
    padding: 0.625rem;
    width: 100%;
    height: 100%;
    display: none;
    position: relative;
  }
  .content h2 {
    padding-bottom: 5px;
    font-weight: bold;
  }
  .content hr {
    height: 0.1rem;
    background: #222;
    margin-bottom: 1rem;
  }
  .active-content {
    display: block;
  }
  .toggle_header {
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: 48em) {
    .content h2 {
      font-size: 1.25rem;
    }
    .active-content button {
      display: block;
      width: 88%;
      margin-top: 2.5rem;
      font-size: 1.3rem;
      font-weight: 600;
    }
    .toggle_header {
      display: flex;
      flex-direction: column;
      min-height: 4.5rem;
    }
  }
`;

export const SavePillButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem 1.5rem 0 0;
  border-radius: 5px;
  background-color: #b2acfa;
  padding: 0.2rem 0.5rem;
  font-size: 1rem;
  font-weight: 800;
  color: black;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #b4a2eb;
    transform: scale(1.02);
  }

  @media screen and (max-width: 48rem) {
    margin-right: 1.3rem;
  }
`;
