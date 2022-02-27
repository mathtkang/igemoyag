import React, { memo } from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const Loader = () => {
  return (
    <LoaderWrap>
      <ReactLoading type="spin" color="#A593E0" height="15%" width="15%" />
    </LoaderWrap>
  );
};

export default memo(Loader);

const LoaderWrap = styled.div`
  width: 100vw;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
