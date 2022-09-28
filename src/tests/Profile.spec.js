import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa a tela de Profile', () => {
  beforeEach(() => {
    global.localStorage.setItem('user', JSON.stringify({ email: 'batata@gmail.com' }));
  });

  it('verify if the email appears on screen and if the Done Recipes button is working', () => {
    const { history } = renderWithRouter(<App />, ['/profile']);

    const email = screen.getByRole('heading', { name: /batata@gmail.com/i });
    const doneBtn = screen.getByRole('button', { name: /done recipes/i });

    expect(email).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();

    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('verify if favorite recipes button is working', () => {
    const { history } = renderWithRouter(<App />, ['/profile']);

    const favBtn = screen.getByRole('button', { name: /favorite recipes/i });

    expect(favBtn).toBeInTheDocument();
    userEvent.click(favBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('verify if logout button is working', () => {
    const { history } = renderWithRouter(<App />, ['/profile']);

    const logoutBtn = screen.getByRole('button', { name: /logout/i });

    expect(logoutBtn).toBeInTheDocument();
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });
});
