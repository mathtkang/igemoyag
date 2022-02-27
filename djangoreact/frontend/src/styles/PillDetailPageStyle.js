import styled from 'styled-components';

export const PillContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  width: 70vw;
  min-height: 100vh;
  padding: 20vh 0 5vh 0;

  @media screen and (max-width: 48em) {
    width: 100%;
    padding: 7vh 0 5vh 0;
    font-size: 1.75rem;
    flex-direction: column;
  } ;
`;

export const PillView1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;

  > img {
    width: 90%;
    margin: 1rem auto;
    border: 3px solid #dee2e6;
  }

  & + div {
    margin-left: 0.8rem;

    @media screen and (max-width: 48em) {
      margin-left: 0;
    }
  }

  @media screen and (max-width: 48em) {
    width: 85%;
    margin: 0 auto;
  } ;
`;

export const PillView2 = styled.div`
  width: 65%;
  background-color: white;
  border: 4px solid #dee2e6;
  border-radius: 0.5rem;

  @media screen and (max-width: 48em) {
    position: relative;
    width: 100%;
  } ;
`;

export const PillName = styled.p`
  font-size: 1.5rem;
  margin: 3rem auto;
  padding: 0.5rem 1rem;
  border: 3px solid #dee2e6;
  border-radius: 1rem;
  background-color: white;

  @media screen and (max-width: 48em) {
    width: 90%;
    margin-top: 3rem;
    margin-bottom: 0;
    font-size: 1.2rem;
  } ;
`;

export const PillBit = styled.p`
  display: inline-block;
  font-size: 1rem;
  font-weight: bold;
  margin: 1rem;
  padding: 0.5rem 1rem;
  background-color: #b2acfa;
  color: white;
  border-radius: 1rem;
`;

export const UserPill = styled.div`
  display: flex;
  flex-direction: row;
  float: right;
  font-size: 1rem;
  margin-top: 1rem;
  margin-right: 1.5rem;
  padding: 0.4rem 1rem;
  border: 2px solid #dee2e6;
  border-radius: 1rem;
  background-color: ${(props) => (!props.isUserPill ? 'white' : '#b2acfa')};
  color: ${(props) => (!props.isUserPill ? 'black' : 'white')};
  font-weight: ${(props) => (props.isUserPill ? '400' : '800')};

  &:hover {
    cursor: pointer;
  }

  > svg {
    margin: auto 0;
  }

  > p {
    margin-left: 0.2rem;
  }

  @media screen and (max-width: 48em) {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 0.8rem;
    margin-right: 0.5rem;
  }
`;

export const PillInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 99%;
  height: 10%;
  justify-content: flex-start;
  align-items: flex-start;

  & + div {
    margin-top: 1.5rem;
  }

  .pillStyle {
    margin-top: 0.3rem;
  }
`;

export const PillCategory = styled.p`
  font-size: 1.2rem;
  color: #8b00ff;
  font-weight: bold;
  width: 2rem;
  margin: 0.2rem 0 1rem 1.5rem;
  flex-shrink: 2;

  @media screen and (max-width: 48em) {
    width: 13.5%;
    font-size: 0.6em;
  }
`;

export const PillDetailInfo = styled.p`
  width: 85%;
  margin: auto 0.5rem;

  @media screen and (max-width: 48em) {
    font-size: 0.5em;
  }
`;

export const DetailButton = styled.button`
  margin: 1.2rem;
  padding: 0.2rem 0.4rem;
  border: 2px solid #b2acfa;
  border-radius: 7px;
  color: #b4a2eb;
  background-color: white;
  font-size: 1rem;
  float: right;

  &:hover {
    background-color: #b4a2eb;
    color: white;
    font-weight: 800;
    cursor: pointer;
  }
`;

export const MoreDetail = styled.div`
  display: ${(props) => (!props.isMoreDetail ? 'none' : 'block')};
`;
