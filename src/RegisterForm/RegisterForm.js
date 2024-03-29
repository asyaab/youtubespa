import React, { useState } from 'react';
import style from './RegisterForm.module.css';
import { Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import pic from './sibdev-logo.svg';
import axios from 'axios';

export const RegisterForm = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState({
    login: '',
    password: '',
  });

  const success = () => {
    message.success('Аккаунт был успешно создан');
  };

  const error = () => {
    message.error(`Что-то пошло не так. Повторите попытку позже`);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const res = await axios({
      method: 'post',
      url: 'https://typ-back.herokuapp.com/api/users/register',
      data: JSON.stringify({
        login: value.login,
        password: value.password,
        firstName: '',
        lastName: '',
        isAdmin: false,
        instagram: '',
        telegram: '',
        moduleId: 1,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(res);
    {
      if (res.data.id) {
        await navigate('/login');
        success();
      } else {
        error();
      }
    }
  };

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={style.container}>
      <img src={pic} alt="pic" />
      <h1 className={style.h1}>Регистрация</h1>
      <form className={style.form} onSubmit={(e) => registerUser(e)}>
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
          name="password"
          id="password"
          className={style.input}
          value={value.password}
          onChange={handleChange}
        />
        <p className={style.p}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
        <Button
          type="primary"
          style={{ height: 52, fontSize: 16 }}
          className={style.btn}
          htmlType="submit">
          Создать аккаунт
        </Button>
      </form>
    </div>
  );
};
