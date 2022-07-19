import React from 'react';
import style from './VideoCard.module.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

export const VideoCard = ({ pic, title, desc, videoId, channelId }) => {
  const [viewCount, setViewCount] = useState('')
  const statisticsURL = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=';
  const API_KEY = 'AIzaSyAp9JTE3Aj8j3lof8_BlkAEvw5emtL65jY';

  const getViewCount = async () => {
    const viewRes = await axios.get(statisticsURL + `${videoId}&key=${API_KEY}`);
    setViewCount(viewRes.data.items[0].statistics.viewCount)
  };

  useEffect(() => {
    getViewCount()
  })

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
            <div className={style.desc_container}>
              <p className={style.desc}>{desc}</p>
              <p className={style.desc}>{viewCount} просмотров</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
