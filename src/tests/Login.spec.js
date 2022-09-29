import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import Login from '../pages/Login';

describe('Testa a tela de login', () => {
  it('Testa a tela de login', () => {
    renderWithRouter(<Login />);
    const stringValida = 'dias@gmail.com';
    const numberValido = '1234567';
    const email = screen.getByTestId('email-input');
    const buttao = screen.getByRole('button', {
      name: /enter/i,
    });
    const password = screen.getByTestId('password-input');
    expect(email).toBeInTheDocument();
    userEvent.type(email, stringValida);
    userEvent.type(password, numberValido);
    expect(buttao).toBeEnabled();
    userEvent.click(buttao);
  });
});
