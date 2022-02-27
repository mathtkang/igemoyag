/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { useLocation } from 'react-router';
import { ScanImgStyle, modalStyles } from '../styles/ScanPageStyle';
import { REACT_APP_HOST_IP_ADDRESS } from '../env';
import WhiteNavbar from '../components/WhiteNavbar';
import {
  PillContainer,
  PillView1,
  PillView2,
  PillName,
  PillBit,
  UserPill,
  PillInfo,
  PillCategory,
  PillDetailInfo,
  DetailButton,
  MoreDetail,
} from '../styles/PillDetailPageStyle';

const PillDetailPage = () => {
  Modal.setAppElement('#root');
  const location = useLocation();
  const { access } = useSelector((state) => state.auth);
  const [isOpen, setOpen] = useState(false);
  const [isUserPill, setUserPill] = useState(false);
  const [isMoreDetail, setMoreDetail] = useState(false);
  const [pillNum, setPillNum] = useState();
  const [pillName, setPillName] = useState();
  const [pillImg, setPillImg] = useState();
  const [pillBit, setPillBit] = useState();
  const [pillSungbun, setPillSungbun] = useState();
  const [pillEfcy, setPillEfcy] = useState();
  const [pillUse, setPillUse] = useState();
  const [pillSideEffect, setPillSideEffect] = useState();
  const [pillAttention, setPillAttention] = useState();
  const [pillInteraction, setPillInteraction] = useState();
  const [pillDeposit, setPillDeposit] = useState();
  const [pillItemNum, setPillItemNum] = useState();

  useEffect(async () => {
    setPillNum(location.state.pillNum); // 일련번호
    try {
      const response1 = await axios.get(
        `${REACT_APP_HOST_IP_ADDRESS}api/pill-detail/?pill_id=${location.state.pillNum}`,
      );
      console.log(response1.data);
      setPillName(response1.data[0].item_name); // 약 이름
      setPillImg(response1.data[0].image); // 약 사진
      setPillBit(response1.data[0].bit); // 약효 분류
      setPillSungbun(response1.data[0].sungbun); // 성분,함량
      setPillEfcy(response1.data[0].efcy_qesitm); // 효능,효과
      setPillUse(response1.data[0].use_method_qesitm); // 용법,용량
      setPillSideEffect(response1.data[0].se_qesitm); // 이상반응
      setPillAttention(response1.data[0].atpn_qesitm); // 주의사항
      setPillInteraction(response1.data[0].intrc_qesitm); // 상호작용
      setPillDeposit(response1.data[0].deposit_method_qesitm); // 보관방법

      const response2 = await axios.get(`${REACT_APP_HOST_IP_ADDRESS}api/user-pill/?pn=${location.state.pillNum}`);

      if (response2.data) {
        setUserPill(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleUserPill = async () => {
    if (!isUserPill) {
      try {
        const response = await axios.post(`${REACT_APP_HOST_IP_ADDRESS}api/user-pill/?pn=${pillNum}`, pillNum);
        console.log(response);
        setUserPill(!isUserPill);
      } catch (err) {
        console.log(err);
        alert('로그인이 필요한 기능입니다');
      }
    } else {
      try {
        const response = await axios.delete(`${REACT_APP_HOST_IP_ADDRESS}api/user-pill/?pn=${pillNum}`);
        console.log(response);
        setUserPill(!isUserPill);
      } catch (err) {
        console.log(err);
        alert('로그인이 필요한 기능입니다');
      }
    }
  };

  return (
    <>
      <WhiteNavbar />
      <PillContainer>
        <PillView1>
          <PillName>{pillName}</PillName>
          <ScanImgStyle src={`m_images/${location.state.pillNum}.jpg`} alt="알약사진" onClick={() => setOpen(true)} />
          <Modal isOpen={isOpen} style={modalStyles} onRequestClose={() => setOpen(false)}>
            <img src={`m_images/${location.state.pillNum}.jpg`} alt="스캔된 사진" style={{ width: '100%', height: '100%' }} />
          </Modal>
        </PillView1>
        <PillView2>
          {/* 컴포넌트 구분선 */}
          <PillBit>{pillBit}</PillBit>
          <UserPill isUserPill={isUserPill} onClick={handleUserPill}>
            {!isUserPill ? <AiOutlineStar size={20} /> : <AiFillStar size={20} style={{ margin: 'auto 0' }} />}
            {!isUserPill ? <p>즐겨찾기 등록</p> : <p>즐겨찾기 완료</p>}
          </UserPill>
          <PillInfo>
            <PillCategory>성분함량</PillCategory>
            <PillDetailInfo className="pillStyle">{pillSungbun}</PillDetailInfo>
          </PillInfo>
          <PillInfo>
            <PillCategory>효능효과</PillCategory>
            <PillDetailInfo>{pillEfcy}</PillDetailInfo>
          </PillInfo>
          <PillInfo>
            <PillCategory>용법용량</PillCategory>
            <PillDetailInfo>{pillUse}</PillDetailInfo>
          </PillInfo>
          <PillInfo>
            <PillCategory>이상반응</PillCategory>
            <PillDetailInfo>{pillSideEffect}</PillDetailInfo>
          </PillInfo>
          {/* 컴포넌트 구분선 */}
          <MoreDetail isMoreDetail={isMoreDetail}>
            <PillInfo>
              <PillCategory>주의사항</PillCategory>
              <PillDetailInfo>{pillAttention}</PillDetailInfo>
            </PillInfo>
            <PillInfo>
              <PillCategory>상호작용</PillCategory>
              <PillDetailInfo>{pillInteraction}</PillDetailInfo>
            </PillInfo>
            <PillInfo>
              <PillCategory>보관방법</PillCategory>
              <PillDetailInfo className="pillStyle">{pillDeposit}</PillDetailInfo>
            </PillInfo>
          </MoreDetail>
          <DetailButton onClick={() => setMoreDetail(!isMoreDetail)}>
            {!isMoreDetail ? <p>+ 더보기</p> : <p>간략 보기</p>}
          </DetailButton>
        </PillView2>
      </PillContainer>
    </>
  );
};

export default PillDetailPage;
