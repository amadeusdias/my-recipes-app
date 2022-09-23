import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testa a tela de login', () => {
  it('Testa a tela de login', () => {
    render(<App />);
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
//   it('Testa a password', () => {
//     const password = screen.getByTestId('password-input');
//     expect(password).toBeInTheDocument();
//   });
});
