import React from 'react'
import style from './LoginForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, message } from 'antd';
import pic from './sibdev-logo.svg'
import axios from 'axios';
import { useState } from 'react';

export const LoginForm = () => {

  const navigate = useNavigate();

  const error = () => {
    message.error('Неверный логин или пароль');
  };

  const [value, setValue] = useState({
    login:"",
    password:""
  })

  const loginUser = async (e) => {
    e.preventDefault()
    const res = await axios(
      {
        method: "post",
        url: "https://typ-back.herokuapp.com/api/auth/login",
        data: JSON.stringify({
          login:value.login,
          password:value.password,
        }),
        headers: { "Content-Type": "application/json" },
      }
      )
      localStorage.setItem("token", res.data.token)
      res.data.token 
      ? navigate("/")
      : error()
  }

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value
    });
  }

  return (
    <div className={style.container}>
      <img src={pic} alt="pic" />
      <h1 className={style.h1}>Вход</h1>
      <form onSubmit={e => loginUser(e)} className={style.form}>
        <label htmlFor="login" className={style.label} style={{ display: 'block' }}>
          Логин
        </label>
        <Input 
          autoFocus 
          id="login" 
          name="login" 
          className={style.input}
          value={value.login}
          onChange={handleChange}
        />
        <label htmlFor="password" className={style.label} style={{ display: 'block' }}>
          Пароль
        </label>
          <Input.Password 
            name='password' 
            id='password' 
            className={style.input}
            value={value.password}
            onChange={handleChange}
          />
          <p className={style.p}>Нет аккаунта? <Link to='/signup' >Зарегистрируйся</Link></p>
          <Button 
            type='primary' 
            style={{height:52, fontSize:16}} 
            className={style.btn}
            htmlType='submit'
          >
            Войти
          </Button>
      </form>
    </div>
  );
};
