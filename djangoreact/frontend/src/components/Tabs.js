/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import axios from 'axios';
import Modal from 'react-modal';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import PillCardContainer from './PillCardContainer';
import { REACT_APP_HOST_IP_ADDRESS } from '../env';
import { Horizon, TabContainer, BlockTabs, ContentTabs, SavePillButton } from '../styles/TabsStyle';

const Tabs = () => {
  const [toggleState, setToggleState] = useState(1);
  const [recentlyPill, setRecentlyPill] = useState();
  const [userPill, setUserPill] = useState();
  const [pillNum, setPillNum] = useState();
  const [shareImg, setShareImg] = useState();
  const [isOpen, setOpen] = useState(false);
  const pillBoxRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { access } = useSelector((state) => state.auth);

  const toggleTab = async (index) => {
    setToggleState(index);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access}`,
      },
    };

    if (index === 1) {
      const { data } = await axios.get(`${REACT_APP_HOST_IP_ADDRESS}api/search-history/`, config);
      console.log('최근 검색 알약 칸이 마운트 되었습니다', data.message);
      if (data.message) {
        return;
      }
      setRecentlyPill((current) => {
        const pillList = data;
        const newList = { ...current, pillList };
        return newList;
      });
    } else if (index === 2) {
      const { data } = await axios.get(`${REACT_APP_HOST_IP_ADDRESS}api/user-pill-list/`, config);
      console.log('즐겨찾기 알약 칸이 마운트 되었습니다', data);
      if (data.length === 0) {
        console.log('리스트가 비어있어요');
        return;
      }
      setUserPill((current) => {
        const pillList = data;
        const newList = { ...current, pillList };
        return newList;
      });
    }
  };

  // 알약 상자 이미지 캡처해서 다운로드
  // const shareImgHandler = async () => {
  //   const pillBox = pillBoxRef.current;
  //   console.log(pillBox);
  //   await domtoimage.toBlob(pillBox).then((blob) => {
  //     window.saveAs(blob, 'pillBox.png');
  //   });
  // };

  const shareImgHandler = async () => {
    window.scrollTo(0, 0);
    // let url = '';
    await html2canvas(pillBoxRef.current).then(async (canvas) => {
      saveAs(canvas.toDataURL(), 'pillBox.png');
      // url = await canvas.toDataURL('image/jpg').split(',')[1];
    });
    // console.log("URL :", url)

    // await uploadImgur(url);
  };

  // const uploadImgur = (url) => {
  //   const apiBase = 'https://api.imgur.com/3/image';
  //   axios
  //     .post(
  //       apiBase,
  //       {
  //         image: url,
  //         type: 'base64',
  //       },
  //       {
  //         headers: {
  //           Authorization: 'Client-ID 20fe858d3434513',
  //         },
  //       },
  //     )
  //     .then((res) => {
  //       console.log(res.data.data.link);
  //       setShareImg(res.data.data.link);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  useEffect(async () => {
    try {
      const { data } = await axios.get(`${REACT_APP_HOST_IP_ADDRESS}api/search-history/`);
      console.log('마운트 시 반환 값 :', data);

      if (data.message) {
        return;
      }

      if (location.state.index === 1) {
        toggleTab(1);
      } else if (location.state.index === 2) {
        toggleTab(2);
      };

      setRecentlyPill((current) => {
        const pillList = data;
        const newList = { ...current, pillList };
        return newList;
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <TabContainer>
      <BlockTabs>
        <button type="button" className={toggleState === 1 ? ' active-tabs' : 'tabs'} onClick={() => toggleTab(1)}>
          최근 검색한 알약
        </button>
        <button type="button" className={toggleState === 2 ? ' active-tabs' : 'tabs'} onClick={() => toggleTab(2)}>
          즐겨찾기한 알약
        </button>
      </BlockTabs>
      <ContentTabs className="content-tabs">
        <div className={toggleState === 1 ? 'content  active-content' : 'content'}>
          <h2>최근 검색한 알약</h2>
          <Horizon />
          {!recentlyPill ? <p>최근 검색한 알약이 없습니다</p> : <PillCardContainer pillList={recentlyPill.pillList} />}
        </div>
        {/* 컴포넌트 구분선 */}
        <div className={toggleState === 2 ? 'content  active-content' : 'content'}>
          <div className="toggle_header">
            <h2>즐겨 찾기한 알약</h2>
            <SavePillButton onClick={shareImgHandler}>알약 상자 저장</SavePillButton>
          </div>
          <Horizon />
          <div ref={pillBoxRef}>
            {!userPill ? <p>즐겨 찾기한 알약이 없습니다</p> : <PillCardContainer pillList={userPill.pillList} />}
          </div>
        </div>
      </ContentTabs>
    </TabContainer>
  );
};

export default Tabs;
