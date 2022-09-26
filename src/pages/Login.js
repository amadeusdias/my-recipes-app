import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppRecipesContext from '../context/AppRecipesContext';
import Header from '../components/Header';
import useLocalStorage from '../hooks/useLocalStorage';
import '../css/login.css';
import logo from '../images/logoRecipesApp.png';
import tomate from '../images/tomate.png';

function Login() {
  const { setUserEmail } = useContext(AppRecipesContext);
  const [, setLocalStorageEmail] = useLocalStorage('user');
  const [, setLocalStorageMeal] = useLocalStorage('mealsToken');
  const [, setLocalStorageDrinks] = useLocalStorage('drinksToken');
  const [email, setEmail] = useState({
    email: '',
  });
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  function validateEmail() {
    const verifyRegexEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email.email);
    return verifyRegexEmail;
  }

  function verifyPassword() {
    const passwordMinLength = 6;
    return password.length >= passwordMinLength;
  }

  function validateButton() {
    setDisabled(!(validateEmail() && verifyPassword()));
  }

  async function handleClick() {
    await setUserEmail(email.email);
    await setLocalStorageEmail(email);
    await setLocalStorageMeal(1);
    await setLocalStorageDrinks(1);
    history.push('/meals');
  }

  return (
    <div className="container-login-page">
      <Header />
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
            setPassword(p.target.value);
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
