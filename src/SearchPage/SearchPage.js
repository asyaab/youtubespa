import React from 'react';
import style from './SearchPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setValue, setResponse } from '../redux/searchSlice';
import axios from 'axios';
import { VideoCard } from '../VideoCard/VideoCard';

export const SearchPage = () => {
  const { value, response } = useSelector((state) => state.searchReducer);
  const dispatch = useDispatch();

  const API_KEY = 'AIzaSyAp9JTE3Aj8j3lof8_BlkAEvw5emtL65jY';
  const URL =
    'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&type=video&';

  const searchVideo = async (e) => {
    e.preventDefault();
    const res = await axios.get(URL + `q=${value}&key=${API_KEY}`);
    localStorage.setItem('searchReq', value);
    dispatch(setResponse(res.data.items));
    console.log(res.data.items);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      searchVideo(e);
      e.preventDefault();
    }
  };

  console.log(response);

  return (
    <>
      <div className={response.length === 0 ? style.container : style.container2}>
        <h1 className={response.length === 0 ? style.h1 : style.h1_2}>Поиск видео</h1>
        <form className={style.form} onSubmit={(e) => searchVideo(e)}>
          <input
            className={response.length === 0 ? style.input : style.input2}
            placeholder="Что хотите посмотреть?"
            autoFocus
            value={value}
            onChange={(e) => dispatch(setValue(e.target.value))}
            onKeyDownCapture={(e) => handleEnter(e)}
          />
          <button className={style.btn}>Найти</button>
        </form>
        {response.length ? (
          <div className={style.filter}>
            <h2 className={style.h2}>
              Видео по запросу: <b>&laquo;{localStorage.getItem('searchReq')}&raquo;</b>
              {response.length}
            </h2>
            <div className={style.filter_pic}>
              <img src="/images/list.svg" alt="pic" className={style.pic} />
              <img src="/images/grid.svg" alt="pic" className={style.pic} />
            </div>
          </div>
        ) : null}
        {response.length
          ? response.map((res) => {
              return (
                <VideoCard
                  key={res.id.videoId}
                  pic={res.snippet.thumbnails.medium.url}
                  title={res.snippet.title}
                  desc={res.snippet.description}
                />
              );
            })
          : null}
      </div>
    </>
  );
};
