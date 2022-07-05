import React from 'react';
import style from './RegisterForm.module.css';
import { Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import pic from './sibdev-logo.svg'
import axios from 'axios';

export const RegisterForm = () => {

  const navigate = useNavigate()

  const signUpUser = async () => {
    const res = await axios.post("https://typ-back.herokuapp.com/api/users/register")
    navigate("/home", { replace: true })
  }

  return (
    <div className={style.container}>
      <img src={pic} alt="pic" />
      <h1 className={style.h1}>Регистрация</h1>
      <form className={style.form} onSubmit={signUpUser}>
        <label htmlFor="username" className={style.label} style={{ display: 'block' }}>
          Логин
        </label>
        <Input autoFocus id="username" name="username" className={style.input}/>
        <label htmlFor="password" className={style.label} style={{ display: 'block' }}>
          Пароль
        </label>
          <Input.Password name='password' id='password' className={style.input}/>
          <p className={style.p}>Уже есть аккаунт? <Link to='/'>Войти</Link></p>
          <Button 
            type='primary' 
            style={{height:52, fontSize:16}} 
            className={style.btn}
            htmlType='submit'
          >Создать аккаунт</Button>
      </form>
    </div>
  );
};
