import React from 'react';
import style from './LikesPage.module.css';
import { LikedReq } from '../LikedReq/LikedReq';
import { ModalWindow } from '../ModalWindow/ModalWindow';

export const LikesPage = () => {
  return (
    <div className={style.outer}>
      <div className={style.container}>
        <h1 className={style.h1}>Избранное</h1>
        {localStorage.getItem('likes') ? (
          JSON.parse(localStorage.getItem('likes')).map((item) => {
            return <LikedReq text={item.name} key={item.id} id={item.id} />;
          })
        ) : (
          <h2>В избранном ничего нет</h2>
        )}
      </div>
      <ModalWindow />
    </div>
  );
};
