import React from 'react';

function Login() {
  return (
    <div>
      <input
        type="text"
        data-testid="email-input"
      />
      <input
        type="text"
        data-testid="password-input"
      />
      <button type="button" data-testid="login-submit-btn">
        Enter
      </button>
    </div>
  );
}

export default Login;
