import React from 'react';
import style from './VideoCard.module.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export const VideoCard = ({ pic, title, desc, videoId, channelId }) => {
  return (
    <>
      <div
        className={style.outer}
        onClick={() =>
          (window.location.href = `https://www.youtube.com/watch?v=${videoId}_channel=${channelId}`)
        }>
        <div className={style.container}>
          <img src={pic} className={style.pic} sizes="100%" />
          <div className={style.txt_container}>
            <p className={style.title}>{title}</p>
            <p className={style.desc}>{desc}</p>
          </div>
        </div>
      </div>
    </>
  );
};
