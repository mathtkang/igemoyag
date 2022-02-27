/* eslint-disable */
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { modalStyles, ScanContainer, ScanBox, ScanBox2, ScanImgStyle, ScanInfoStyle, InfoButton } from '../styles/ScanPageStyle';

const ScanResult = ({ pillList }) => {
  Modal.setAppElement('#root');
  const navigate = useNavigate();
  const [isOpen1, setOpen1] = useState(false);
  const [isOpen2, setOpen2] = useState(false);
  const [isOpen3, setOpen3] = useState(false);
  const [isOpen4, setOpen4] = useState(false);
  const [isOpen5, setOpen5] = useState(false);

  return (
    <ScanContainer>
      <ScanBox>
        <ScanImgStyle src={`m_images/${pillList['1.알약'][0].item_num}.jpg`} alt="스캔된 사진" onClick={() => setOpen1(true)} />
        <Modal isOpen={isOpen1} style={modalStyles} onRequestClose={() => setOpen1(false)}>
          <img src={pillList['1.알약'][0].image} alt="스캔된 사진" style={{ width: '100%', height: '100%' }} />
        </Modal>
        <ScanInfoStyle>
          <h1>
            {pillList['1.알약'][0].item_name}
          </h1>
          <p className="probability">{pillList['1.확률']}</p>
          <InfoButton type="button" onClick={() => navigate('/pilldetail', { state: { pillNum: pillList['1.알약'][0].item_num } })}>
            해당 약 정보 확인
          </InfoButton>
        </ScanInfoStyle>
      </ScanBox>
      <ScanBox2 isDataNull={pillList['2.알약']}>
        <ScanImgStyle src={`m_images/${pillList['2.알약'][0].item_num}.jpg`} alt="스캔된 사진" onClick={() => setOpen2(true)} />
        <Modal isOpen={isOpen2} style={modalStyles} onRequestClose={() => setOpen2(false)}>
          <img src={pillList['2.알약'][0].image} alt="스캔된 사진" style={{ width: '100%', height: '100%' }} />
        </Modal>
        <ScanInfoStyle>
          <h1>
            {pillList['2.알약'][0].item_name}
          </h1>
          <p>{pillList['2.확률']}</p>
          <InfoButton type="button" onClick={() => navigate('/pilldetail', { state: { pillNum: pillList['2.알약'][0].item_num } })}>
            해당 약 정보 확인
          </InfoButton>
        </ScanInfoStyle>
      </ScanBox2>
      <ScanBox2 isDataNull={pillList['3.알약']}>
        <ScanImgStyle src={`m_images/${pillList['3.알약'][0].item_num}.jpg`} alt="스캔된 사진" onClick={() => setOpen3(true)} />
        <Modal isOpen={isOpen3} style={modalStyles} onRequestClose={() => setOpen3(false)}>
          <img src={pillList['3.알약'][0].image} alt="스캔된 사진" style={{ width: '100%', height: '100%' }} />
        </Modal>
        <ScanInfoStyle>
          <h1>
            {pillList['3.알약'][0].item_name}
          </h1>
          <p>{pillList['3.확률']}</p>
          <InfoButton type="button" onClick={() => navigate('/pilldetail', { state: { pillNum: pillList['3.알약'][0].item_num } })}>
            해당 약 정보 확인
          </InfoButton>
        </ScanInfoStyle>
      </ScanBox2>
      <ScanBox2 isDataNull={pillList['4.알약']}>
        <ScanImgStyle src={`m_images/${pillList['4.알약'][0].item_num}.jpg`} alt="스캔된 사진" onClick={() => setOpen4(true)} />
        <Modal isOpen={isOpen4} style={modalStyles} onRequestClose={() => setOpen4(false)}>
          <img src={pillList['4.알약'][0].image} alt="스캔된 사진" style={{ width: '100%', height: '100%' }} />
        </Modal>
        <ScanInfoStyle>
          <h1>
            {pillList['4.알약'][0].item_name}
          </h1>
          <p>{pillList['4.확률']}</p>
          <InfoButton type="button" onClick={() => navigate('/pilldetail', { state: { pillNum: pillList['4.알약'][0].item_num } })}>
            해당 약 정보 확인
          </InfoButton>
        </ScanInfoStyle>
      </ScanBox2>
      <ScanBox2 isDataNull={pillList['5.알약']}>
        <ScanImgStyle src={`m_images/${pillList['5.알약'][0].item_num}.jpg`} alt="스캔된 사진" onClick={() => setOpen5(true)} />
        <Modal isOpen={isOpen5} style={modalStyles} onRequestClose={() => setOpen5(false)}>
          <img src={pillList['5.알약'][0].image} alt="스캔된 사진" style={{ width: '100%', height: '100%' }} />
        </Modal>
        <ScanInfoStyle>
          <h1>
            {pillList['5.알약'][0].item_name}
          </h1>
          <p>{pillList['5.확률']}</p>
          <InfoButton type="button" onClick={() => navigate('/pilldetail', { state: { pillNum: pillList['5.알약'][0].item_num } })}>
            해당 약 정보 확인
          </InfoButton>
        </ScanInfoStyle>
      </ScanBox2>
    </ScanContainer>
  );
};

export default ScanResult;
