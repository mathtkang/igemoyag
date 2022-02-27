import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { palePink } from '../styles/color';

const ResultBox = ({ pill }) => {
  const navigate = useNavigate();
  const pillNum = pill.item_num;

  return (
    <PillInfoBox
      className="pillInfo_Box"
      id={pill.item_num}
      onClick={() => navigate('/pilldetail', { state: { pillNum } })}
    >
      <PillImage src={`m_images/${pill.item_num}.jpg`} alt={pill.item_name} />
      <DecriptionBox className="description_box">
        <div className="description_box_header">
          <h3 className="pill_info_name">{pill.item_name}</h3>
          <p className="pill_info_bit">{pill.bit}</p>
        </div>
        <div className="pill_info_sungbun">
          <h4>성분 함량</h4>
          {pill.sungbun}
        </div>
        <div className="pill_info_effect">
          <h4>효능 효과</h4>
          {pill.efcy_qesitm}
        </div>
      </DecriptionBox>
    </PillInfoBox>
  );
};

export default ResultBox;

const PillInfoBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  height: 24vh;
  background-color: white;
  &:hover {
    transition: 300ms;
    transform: scale(1.02);
  }
  @media screen and (max-width: 48rem) {
    height: 13vh;
  }
`;

const PillImage = styled.img`
  height: 100%;
  padding: 0.313em;
  flex-shrink: 0;
  overflow: hidden;
  @media screen and (max-width: 48rem) {
    flex-shrink: 1;
  }
`;

const DecriptionBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
  padding: 0.375em;

  div {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding-bottom: 1em;
    h3 {
      font-size: 1em;
      border: 2px solid ${palePink};
      border-radius: 1.25em 0 0 1.25em;
      padding: 0.313em 0.625em 0.313em 1.25em;
    }
    p {
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-weight: 600;
      padding: 0.313em 1.25em 0.313em 0.625em;
      border-radius: 0 1.25em 1.25em 0;
      background-color: ${palePink};
    }
    h4 {
      flex-shrink: 0;
      margin: 0 0.625em;
      width: 2rem;
      color: #8b00ff;
    }
  }

  @media screen and (max-width: 48rem) {
    div {
      overflow: scroll;
      h3 {
        overflow: auto;
        white-space: nowrap;
        border-radius: 1.25em 0 0 1.25em;
        padding: 0 0.313em;
        height: 1rem;
      }
      p {
        overflow: auto;
        white-space: nowrap;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 1rem;
        font-weight: 600;
        padding: 0 0.313em;
        border-radius: 0 1.25em 1.25em 0;
        background-color: ${palePink};
      }
      h4 {
        flex-shrink: 0;
        margin: 0 0.625em;
        width: 1.5rem;
        color: #8b00ff;
      }
    }
  }
`;
