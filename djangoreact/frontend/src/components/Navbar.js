/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as faIcons from 'react-icons/fa';
import * as grIcons from 'react-icons/gr';
import { useSelector, useDispatch } from 'react-redux';
import { initializeInput } from '../redux/authSlice';
import { REACT_APP_HOST_IP_ADDRESS } from '../env';
import { SearchBoxData, AuthBoxData, PillBoxData } from '../helper/sidebarData';
import { NavBox, MenuBox, MenuBoxContent, ContentBox } from '../styles/NavbarStyle';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  const { username, logged } = useSelector((state) => state.auth);

  const Logout = async () => {
    setSidebar(!sidebar);
    const LOGOUT_URL = `${REACT_APP_HOST_IP_ADDRESS}api/logout/`;
    const localRefreshToken = localStorage.getItem('refresh');
    const sessionRefreshToken = sessionStorage.getItem('refresh');

    try {
      let refresh;
      if (localRefreshToken) {
        refresh = { refresh: localRefreshToken };
      } else {
        refresh = { refresh: sessionRefreshToken };
      }
      await axios.post(LOGOUT_URL, refresh);
    } catch (err) {
      console.log(err);
    }
    localStorage.removeItem('refresh');
    sessionStorage.removeItem('refresh');
    dispatch(initializeInput());
    window.location.href = '/';
  };

  return (
    <>
      <NavBox className="navbar">
        <faIcons.FaBars onClick={showSidebar} />
      </NavBox>
      <MenuBox active={sidebar} className={sidebar ? 'sidebar_active' : 'sidebar_unactive'}>
        <MenuBoxContent className="nav_menu_list">
          <div className="nav_menu_list_header">
            <li className="navTogle">
              <grIcons.GrFormClose onClick={showSidebar} />
            </li>
          </div>
          {logged && (
            <div className="">
              <h2>{username}님</h2>
              <span>건강한 하루를 응원합니다</span>
            </div>
          )}
          <h3>알약 검색</h3>
          <ContentBox className="nav_menu_list_search">
            {SearchBoxData.map((item) => {
              return (
                <li key={item.title} className={item.className}>
                  <Link to={item.path} onClick={showSidebar}>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ContentBox>
          {logged && <h3>내 알약상자</h3>}
          <ContentBox className="nav_menu_list_Auth">
            {logged ? (
              // ? PillBoxData.map((item) => {
              //     return (
              //       <li key={item.title} className={item.className}>
              //         <Link to={item.path} onClick={showSidebar}>
              //           {item.title}
              //         </Link>
              //       </li>
              //     );
              //   })
              <>
                <li onClick={showSidebar}>
                  <a
                    className="pillBox"
                    type="button"
                    onClick={() => navigate('/pillBox', { state: { index: 1 } })}
                  >
                    최근검색 알약
                  </a>
                </li>
                <li onClick={showSidebar}>
                  <a
                    className="pillBox"
                    type="button"
                    onClick={() => navigate('/pillBox', { state: { index: 2 } })}
                  >
                    즐겨찾기 알약
                  </a>
                </li>
              </>
            ) : (
              AuthBoxData.map((item) => {
                return (
                  <li key={item.title} className={item.className}>
                    <Link to={item.path} onClick={showSidebar}>
                      {item.title}
                    </Link>
                  </li>
                );
              })
            )}
            {logged ? (
              <button type="button" onClick={Logout}>
                로그아웃
              </button>
            ) : null}
          </ContentBox>
        </MenuBoxContent>
      </MenuBox>
    </>
  );
};

export default Navbar;
