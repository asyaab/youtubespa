import React from 'react';
import { Modal } from 'antd';
import style from './ModalWindow.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalVisible, setLiked } from '../redux/searchSlice';
import { IntegerStep } from '../UI/Slider/Slider';
import { useState } from 'react';

export const ModalWindow = () => {
  const [inputValue, setInputValue] = useState('');

  const saveReq = () => {
    const select = document.getElementById('select');
    return {
      value: value,
      name: inputValue,
      sort: select.value,
      maxResults: sliderValue,
      id: Date.now()
    };
  };

  //Redux
  const { isModalVisible } = useSelector((state) => state.searchReducer);
  const { value, sliderValue } = useSelector((state) => state.searchReducer);
  const dispatch = useDispatch();

  const saveToLocalStorage = () => {
    const req = saveReq();
    console.log(req);
    if (localStorage.getItem('likes')) {
      const data = JSON.parse(localStorage.getItem('likes'));
      localStorage.setItem('likes', JSON.stringify([...data, req]));
    } else {
      localStorage.setItem('likes', JSON.stringify([req]));
    }
  };

  // const deleteFromLocalStorage = () => {
  //   if (localStorage.getItem('likes')) {
  //     const data = JSON.parse(localStorage.getItem('likes'));
  //     localStorage.getItem('likes');
  //   } else {
  //     return null;
  //   }
  // };

  const handleOk = () => {
    dispatch(setIsModalVisible(false));
    dispatch(setLiked(true));
    saveToLocalStorage();
  };

  const handleCancel = () => {
    dispatch(setIsModalVisible(false));
    dispatch(setLiked(false));
  };

  return (
    <>
      <Modal
        closable={false}
        width={510}
        bodyStyle={{ borderRadius: 10, textAlign: 'center' }}
        title="Сохранить запрос"
        visible={isModalVisible}
        onCancel={handleCancel}
        cancelText={'Не сохранять'}
        onOk={handleOk}
        okText={'Сохранить'}>
        <div className={style.input}>
          <label htmlFor="req" style={{ marginBottom: 5 }}>
            Запрос
          </label>
          <input id="req" placeholder={value} disabled style={{ width: '100%' }} />
        </div>
        <div className={style.input}>
          <label htmlFor="name" style={{ marginBottom: 5 }}>
            <span style={{ color: 'red' }}>*</span>Название
          </label>
          <input
            autoFocus
            required
            id="name"
            placeholder={'Укажите название'}
            style={{ width: '100%' }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className={style.input}>
          <label htmlFor="select" style={{ marginBottom: 5 }}>
            Сортировать по
          </label>
          <select id="select" style={{ width: '100%' }}>
            <option value={'relevance'} selected>
              Без сортировки
            </option>
            <option value={'title'}>По алфавиту</option>
            <option value={'viewCount'}>По просмотрам</option>
            <option value={'date'}>По дате добавления</option>
          </select>
        </div>
        <IntegerStep />
      </Modal>
    </>
  );
};
