import React from 'react';
import axios from 'axios';
import { Pagination } from 'antd';
import style from './SearchPage.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setValue, setResponse, setIsModalVisible, searchVideo } from '../redux/searchSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faBorderAll } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { VideoCard } from '../VideoCard/VideoCard';
import { VideoCardGrid } from '../VideoCardGrid/VideoCardGrid';
import { ModalWindow } from '../ModalWindow/ModalWindow';

export const SearchPage = () => {
  //Local state
  const [list, setList] = useState(true);

  //Redux store
  const { value, response, liked } = useSelector((state) => state.searchReducer);
  const dispatch = useDispatch();

  //Functions
  const listChange = () => {
    setList(!list);
  };

  // const searchVideo = async (e) => {
  //   e.preventDefault();
  //   const res = await axios.get(URL + `q=${value}&key=${API_KEY}`);
  //   localStorage.setItem('searchReq', value);
  //   dispatch(setResponse(res.data.items));
  // };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      dispatch(searchVideo({e, value}));
    }
  };

  const handleLike = () => {
    dispatch(setIsModalVisible());
  };

  const changePage = () => {};

  console.log(response);

  return (
    <>
      <div className={response.length === 0 ? style.container : style.container2}>
        <h1 className={response.length === 0 ? style.h1 : style.h1_2}>Поиск видео</h1>
        <form className={style.form} onSubmit={(e) => dispatch(searchVideo({e, value}))}>
          <input
            className={response.length === 0 ? style.input : style.input2}
            placeholder="Что хотите посмотреть?"
            autoFocus
            value={value}
            onChange={(e) => dispatch(setValue(e.target.value))}
            onKeyDownCapture={(e) => handleEnter(e)}
          />
          {response.length && !liked ? (
            <FontAwesomeIcon icon={faHeart} className={style.faHeart} onClick={handleLike} />
          ) : (
            <FontAwesomeIcon icon={faHeartSolid} className={style.faHeart} onClick={handleLike} />
          )}
          <button className={style.btn}>Найти</button>
        </form>
        {response.length ? (
          <>
            <div className={style.filter}>
              <h2 className={style.h2}>
                Видео по запросу: <b>&laquo;{localStorage.getItem('searchReq')}&raquo;</b>{' '}
                <span style={{ color: 'lightslategrey' }}>{response.length}</span>
              </h2>
              <div className={style.filter_icon}>
                <FontAwesomeIcon
                  icon={faList}
                  className={list ? style.icon_checked : style.icon}
                  onClick={() => listChange()}
                />
                <FontAwesomeIcon
                  icon={faBorderAll}
                  className={!list ? style.icon_checked : style.icon}
                  onClick={() => listChange()}
                />
              </div>
            </div>
            <Pagination defaultCurrent={1} total={12} onChange={changePage} />;
          </>
        ) : null}
        {response.length && list
          ? response.map((res) => {
              return (
                <VideoCard
                  key={res.id.videoId}
                  pic={res.snippet.thumbnails.medium.url}
                  title={res.snippet.title}
                  desc={res.snippet.description}
                  videoId={res.id.videoId}
                  channelId={res.snippet.channelId}
                />
              );
            })
          : null}
        <div className={style.container_grid}>
          {response.length && !list
            ? response.map((res) => {
                return (
                  <VideoCardGrid
                    key={res.id.videoId}
                    pic={res.snippet.thumbnails.medium.url}
                    title={res.snippet.title}
                    desc={res.snippet.description}
                    videoId={res.id.videoId}
                    channelId={res.snippet.channelId}
                    // viewCount={res.statistics.viewCount}
                  />
                );
              })
            : null}
        </div>
        <ModalWindow />
      </div>
    </>
  );
};
