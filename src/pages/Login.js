import React, { useContext, useState } from 'react';
import AppRecipesContext from '../context/AppRecipesContext';
import '../css/login.css';
import logo from '../images/logoRecipesApp.png';
import tomate from '../images/tomate.png';

function Login() {
  const { setUserEmail } = useContext(AppRecipesContext);
  // const [userInfo, setUserInfo] = useState({
  //   email: '',
  //   password: '',
  //   disable: true,
  // });
  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  // function handleInput({ target }) {
  //   const { name, value } = target;
  //   setUserInfo({
  //     ...userInfo,
  //     [name]: value,
  //   });
  //   validateButton();
  // }

  function validateEmail() {
    const verifyRegexEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
    return verifyRegexEmail;
  }

  function verifyPassword() {
    const passwordMinLength = 6;
    return userPassword.length >= passwordMinLength;
  }

  function validateButton() {
    setDisabled(!(validateEmail() && verifyPassword()));
  }

  function handleClick() {
    setUserEmail(email);
  }

  return (
    <div className="container-login-page">
      <div className="container-top">
        <img src={ logo } alt="logoRecipesApp" />
      </div>
      <div className="tomate">
        <img src={ tomate } alt="tomate" />
      </div>
      <div className="container-down">
        <h1 className="Title-login">LOGIN</h1>
        <input
          className="input-login"
          type="email"
          data-testid="email-input"
          // value={ userEmail }
          name="email"
          placeholder="E-mail"
          onChange={ (e) => {
            setEmail(e.target.value);
            validateButton();
          } }
        />
        <input
          className="input-login"
          type="password"
          data-testid="password-input"
          // value={ userInfo.password }
          name="password"
          placeholder="Password"
          onChange={ (p) => {
            setUserPassword(p.target.value);
            validateButton();
          } }
        />
        <button
          className="btn-enter"
          type="button"
          data-testid="login-submit-btn"
          onClick={ handleClick }
          disabled={ disabled }
        >
          ENTER
        </button>
      </div>
    </div>
  );
}

export default Login;
