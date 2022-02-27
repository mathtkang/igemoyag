import axios from 'axios';
import React, { useState } from 'react';
import DirectSearchResult from '../components/DirectSearchResult';
import { PillShapeData, PillColorData } from '../helper/pillData';
import WhiteNavbar from '../components/WhiteNavbar';
import { REACT_APP_HOST_IP_ADDRESS } from '../env';
import {
  SearchBox,
  NameBox,
  NonNameContainer,
  ButtonBox,
  ShapeColorBox,
  SearchPage,
  SelectBox,
} from '../styles/DirectSearchPageStyle';

function DirectSearchPage() {
  const [pillName, setPillName] = useState('');
  const [shape, setShape] = useState('');
  const [color, setColor] = useState('');

  const [target, setTarget] = useState(null);
  const [count, setCount] = useState(null);
  const [pillList, setPillList] = useState(null);

  let start = true;
  let page = 0;
  let totalPage = 0;

  const handleChange = (event) => {
    setPillName(event.target.value);
  };

  const handleClick = (event, type) => {
    const { id, innerText } = event.currentTarget;
    if (type === 'shape') {
      setShape(id);
    }
    if (type === 'color') {
      setColor(innerText);
    }
  };

  const handleReset = () => {
    window.location.replace('/direct');
  };

  const directSearch = async () => {
    const url = `${REACT_APP_HOST_IP_ADDRESS}api/search-direct/?name=${pillName}&shape=${
      shape !== '선택안함' ? shape : ''
    }&color_front=${color !== '선택안함' ? color : ''}&page=1`;

    const { data } = await axios.get(url);
    if (data[1].count === 0) {
      setPillList(null);
      setCount(0);
      page = 0;
      totalPage = 0;
      return;
    }
    if (data) {
      totalPage = data[0].total_page;
      setCount(data[1].count);
      page = data[2].page + 1;
      setPillList(data[3]);
      start = false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    directSearch();
  };

  const printMoreItem = async () => {
    if (page > totalPage) return;
    if (start) return;

    const parameter = `?name=${pillName}&shape=${shape !== '선택안함' ? shape : ''}&color_front=${
      color !== '선택안함' ? color : ''
    }&page=${page}`;
    const url = `${REACT_APP_HOST_IP_ADDRESS}api/search-direct/${parameter}`;

    const { data } = await axios.get(url);

    page += 1;

    const newPillList = data[3];

    setPillList((pillist) => pillist.concat(newPillList));
  };

  const onIntersect = ([{ isIntersecting }]) => {
    if (page === 0) return;
    if (isIntersecting && page !== 0) printMoreItem();
  };

  if (target) {
    const observer = new IntersectionObserver(onIntersect, {
      threshold: 1,
    });
    observer.observe(target);
  }
  return (
    <>
      <WhiteNavbar />
      <SearchPage className="search_direct">
        <h1>알약 직접 검색</h1>
        <SearchBox className="search_direct_box" onSubmit={handleSubmit}>
          <NameBox className="search_name_box">
            <h2>약 이름 검색</h2>
            <input name="searchName" type="text" onChange={handleChange} value={pillName} />
          </NameBox>
          <NonNameContainer className="search_another_box">
            <h2>약 모양 검색</h2>
            <ShapeColorBox className="search_another_box_shape">
              <span>
                모양
                <br />
                선택
              </span>
              {PillShapeData.map((item) => {
                return (
                  <SelectBox
                    role="button"
                    key={item.title}
                    value={item.title}
                    className={shape === item.shape ? 'checked' : 'selectbox_shape'}
                    id={item.shape}
                    onClick={(e) => {
                      handleClick(e, 'shape');
                    }}
                    onKeyDown={(e) => {
                      handleClick(e, 'shape');
                    }}
                    tabIndex="0"
                  >
                    {item.icon}
                    {item.title}
                  </SelectBox>
                );
              })}
            </ShapeColorBox>
            <ShapeColorBox className="search_another_box_color">
              <span>
                색상
                <br />
                선택
              </span>
              {PillColorData.map((item) => {
                if (item.title === '선택안함') {
                  return (
                    <SelectBox
                      role="button"
                      key={item.title}
                      className={color === item.title ? 'checked' : 'selectbox_shape'}
                      id={item.color}
                      onClick={(e) => {
                        handleClick(e, 'color');
                      }}
                      onKeyDown={(e) => {
                        handleClick(e, 'color');
                      }}
                      tabIndex="0"
                    >
                      {item.title}
                    </SelectBox>
                  );
                }
                return (
                  <SelectBox
                    role="button"
                    key={item.color}
                    className={color === item.title ? 'checked' : 'selectbox_shape'}
                    id={item.color}
                    onClick={(e) => {
                      handleClick(e, 'color');
                    }}
                    onKeyDown={(e) => {
                      handleClick(e, 'color');
                    }}
                    tabIndex="0"
                  >
                    <div className="selectbox_color"> </div>
                    {item.title}
                  </SelectBox>
                );
              })}
            </ShapeColorBox>
          </NonNameContainer>
          <ButtonBox className="search_button_box">
            <button type="button" className="reset_button" onClick={handleReset}>
              초기화
            </button>
            <button type="submit" className="search_button">
              검색
            </button>
          </ButtonBox>
        </SearchBox>
        <div className="count_result">
          {(function () {
            if (count && count !== 0) {
              return <h4>{count} 건의 검색 결과가 있습니다</h4>;
            }
            if (count === 0) {
              return <h4>검색 결과가 없습니다</h4>;
            }
            return '';
          })()}
        </div>
        {pillList && <DirectSearchResult pillList={pillList} />}
        <div ref={setTarget} className="target_element">
          {' '}
        </div>
      </SearchPage>
    </>
  );
}

export default DirectSearchPage;
