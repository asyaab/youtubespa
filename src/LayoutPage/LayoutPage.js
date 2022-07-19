import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import style from './LayoutPage.module.css';
import { setValue, setResponse } from '../redux/searchSlice';
import { useDispatch } from 'react-redux';
const { Header } = Layout;

export const LayoutPage = () => {

  const dispatch = useDispatch()
  
  const navigate = useNavigate();
  const logOut = () => {
    navigate('/login')
    localStorage.removeItem('searchReq')
    localStorage.removeItem('token')
    dispatch(setValue(''))
    dispatch(setResponse([]))
  }

  return (
    <div className={style.container}>
      <Layout className={style.layout}>
        <Header style={{ background: 'white' }}>
          <div className={style.logo} onClick={() => navigate('/')}/>
          <Menu className={style.menu} mode="horizontal">
            <Menu.Item><Link to='/'>Поиск</Link></Menu.Item>
            <Menu.Item><Link to='/likes'>Избранное</Link></Menu.Item>
            <Menu.Item onClick={logOut}>Выйти</Menu.Item>
          </Menu>
        </Header>
        <Outlet className={style.outlet}/>
      </Layout>
    </div>
  );
};
