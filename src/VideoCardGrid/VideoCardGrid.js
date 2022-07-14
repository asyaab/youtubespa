import React from 'react';
import style from './VideoCardGrid.module.css';

export const VideoCardGrid = ({ pic, title, desc, videoId, channelId, viewCount }) => {
  return (
    <>
      <div
        className={style.container}
        onClick={() =>
          (window.location.href = `https://www.youtube.com/watch?v=${videoId}_channel=${channelId}`)
        }>
        <img src={pic} className={style.pic} sizes="100%" />
        <div className={style.txt_container}>
          <p className={style.title}>{title}</p>
          <p className={style.desc}>{desc}</p>
          <p className={style.viewCount}>{viewCount}</p>
        </div>
      </div>
    </>
  );
};
