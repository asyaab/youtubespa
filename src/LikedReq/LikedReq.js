import React from 'react';
import style from './LikedReq.module.css';
import axios from 'axios';
import { setResponse, setValue } from '../redux/searchSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const LikedReq = ({ text, id }) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const API_KEY = 'AIzaSyAp9JTE3Aj8j3lof8_BlkAEvw5emtL65jY';
  const URL = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&';

  const getItem = (id) => {
    return JSON.parse(localStorage.getItem('likes')).find((item) => item.id === id);
  };

  const handleClick = (e) => {
    setActive(!active);
  };

  const getReq = async (e) => {
    e.stopPropagation();
    const item = getItem(id);
    const res = await axios.get(
      URL + `order=${item.sort}&maxResults=${item.maxResults}&q=${item.value}&key=${API_KEY}`,
    );
    localStorage.setItem('searchReq', item.value);
    dispatch(setResponse(res.data.items));
    dispatch(setValue(item.value));
    navigate('/');
  };

  const deleteLike = (id) => {
    // const newLikes = (JSON.parse(localStorage.getItem('likes'))).filter(item => item.id !== id)
    // console.log(newLikes)
    // // localStorage.setItem('likes', JSON.stringify([...newLikes]))
  }

  return (
    <div
      className={!active ? style.container : style.container_active}
      onClick={(e) => handleClick(e)}>
      <p className={style.p}>{text}</p>
      {active ? (
        <div className={style.btns__container}>
          <button className={style.btn} onClick={(e) => getReq(e)}>
            Выполнить
          </button>
          <div className={style.links}>
            <a href="#">Изменить</a>
            <button onClick={() => deleteLike(id)}><span style={{color:'red'}}>Удалить</span></button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
