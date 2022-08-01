import React from 'react';
import style from './LikedReq.module.css';
import { setResponse, getReq } from '../redux/searchSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const LikedReq = ({ text, id }) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    setActive(!active);
  };

  const deleteLike = (id) => {
    const newLikes = JSON.parse(localStorage.getItem(`likes${localStorage.getItem('token')}`)).filter((item) => item.id !== id);
    console.log(newLikes);
    localStorage.setItem(`likes${localStorage.getItem('token')}`, JSON.stringify([...newLikes]));
    dispatch(setResponse(newLikes));
  };

  return (
    <div
      className={!active ? style.container : style.container_active}
      onClick={(e) => handleClick(e)}>
      <p className={style.p}>{text}</p>
      {active ? (
        <div className={style.btns__container}>
          <button
            className={style.btn}
            onClick={async (e) => {
              await dispatch(getReq({ e, id }));
              navigate('/');
            }}>
            Выполнить
          </button>
          <div className={style.links}>
            <a href="#">Изменить</a>
            <button onClick={() => deleteLike(id)}>
              <span style={{ color: 'red' }}>Удалить</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
