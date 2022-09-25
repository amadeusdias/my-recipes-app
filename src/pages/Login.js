import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import AppRecipesContext from '../context/AppRecipesContext';
import useLocalStorage from '../hooks/useLocalStorage';

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
    <div>
      <Header />
      <input
        type="text"
        data-testid="email-input"
        value={ email.email }
        name="email"
        onChange={ (e) => {
          setEmail({ ...email, email: e.target.value });
          validateButton();
        } }
      />
      <input
        type="text"
        data-testid="password-input"
        name="password"
        value={ password }
        onChange={ (p) => {
          setPassword(p.target.value);
          validateButton();
        } }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ handleClick }
        disabled={ disabled }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
