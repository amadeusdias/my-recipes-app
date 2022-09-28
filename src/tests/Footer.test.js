import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste o componente Footer', () => {
  it('testes do componente <Footer />', async () => {
    renderWithRouter(<App />);

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

    const mealsButton = await screen.findByTestId('meals-bottom-btn');
    expect(mealsButton).toBeInTheDocument();
  });
});
