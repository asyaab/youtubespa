import React from 'react'
import style from './VideoCard.module.css'

export const VideoCard = ({pic, title, desc}) => {
  return (
    <>
        <div className={style.outer}>
          <div className={style.container}>
            <img src={pic} className={style.pic} sizes='100%'/>
            <div className={style.txt_container}>
              <p className={style.title}>{title}</p>
              <p className={style.desc}>{desc}</p>
            </div>
          </div>
        </div>
    </>
  )
}
