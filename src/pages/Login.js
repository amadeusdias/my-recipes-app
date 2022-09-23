import React, { useContext, useState } from 'react';
import AppRecipesContext from '../context/AppRecipesContext';

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
    <div>
      <input
        type="text"
        data-testid="email-input"
        // value={ userEmail }
        name="email"
        onChange={ (e) => {
          setEmail(e.target.value);
          validateButton();
        } }
      />
      <input
        type="text"
        data-testid="password-input"
        name="password"
        // value={ userInfo.password }
        onChange={ (p) => {
          setUserPassword(p.target.value);
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
