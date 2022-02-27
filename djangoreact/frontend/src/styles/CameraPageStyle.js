import styled from 'styled-components';

export const CameraPageContainer = styled.div`
  padding-top: 5vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 15vw;
  .camerapage_header {
    width: 100%;
  }
  h1 {
    font-size: 2rem;
    color: white;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 48em) {
    width: 100%;
    padding: 15vh 0 5vh;
    font-size: 1.75rem;

    h1 {
      font-size: 1.1em;
    }

    .camerapage_header {
      width: 80%;
    }
  } ;
`;

export const LogoStyle = styled.img`
  width: 22vw; //모바일 100vw
  margin: 0 auto;
  border: 0.4rem solid #b4a2eb;
  border-radius: 0.4rem;
`;

export const InfoStyle = styled.div`
  display: flex;
  height: 15vh;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%; //모바일 90vw
  border-radius: 5px;
  background-color: white;

  @media screen and (max-width: 48em) {
    height: 12vh;
  }

  img {
    float: right;
    height: 90%;
    border: 3px solid #b4a2eb;
    border-radius: 5px;
  }

  > p {
    font-size: 1.25rem;
    height: 90%;
  }

  .scanning {
    font-size: 1.5rem;
    font-weight: bold;
  }

  @media screen and (max-width: 48em) {
    width: 80%;
    font-size: 1.65rem;

    p {
      font-size: 0.5em;
      padding: 0.5rem;
    }

    .scanning {
      font-size: 0.8em;
    }
  } ;
`;

export const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  border-radius: 5px;
  padding: 0.5rem;

  @media screen and (max-width: 48em) {
    width: 80%;

    .loading {
      width: 95%;
      height: 100%;
    }
  } ;
`;

export const WebcamContainer = styled.div`
  border: 0.4rem solid #b4a2eb;
  border-radius: 0.4rem;
  margin: 0 auto;
  width: 22vw; //모바일 60vw
  height: 22vw; //모바일 70vw

  @media screen and (max-width: 48em) {
    width: 97%;
    height: 100%;
    font-size: 1.75rem;
    border: 0;
  } ;
`;

export const ButtonStyle = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem auto;

  > button + button {
    margin-left: 1rem;
  }

  button {
    padding: 0.5rem 0.5rem;
    border: 2px solid #b2acfa;
    border-radius: 7px;
    background-color: white;
    font-size: 1.2rem;
    color: #b4a2eb;
    &:hover {
      color: white;
      background-color: #b4a2eb;
      font-weight: 800;
    }

    @media screen and (max-width: 48em) {
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 48em) {
    margin: 0.5rem auto;
  }
`;

export const PreviewImgStyle = styled.img`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
`;

export const InputLabel = styled.label`
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;
