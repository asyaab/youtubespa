import { Col, Row } from 'antd';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import style from './LayoutPage.module.css';
const { Header } = Layout;

export const LayoutPage = () => {
  
  const navigate = useNavigate();
  const location = useLocation()
  const logOut = () => {
    navigate('/login')
    localStorage.clear()
  }

  return (
    <div className={style.container}>
      <Layout className={style.layout}>
        <Header style={{ background: 'white' }}>
          <div className={style.logo} />
          <Menu className={style.menu} mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item>Поиск</Menu.Item>
            <Menu.Item>Избранное</Menu.Item>
            <Menu.Item onClick={logOut}>Выйти</Menu.Item>
          </Menu>
        </Header>
        <Outlet />
      </Layout>
    </div>
  );
};
