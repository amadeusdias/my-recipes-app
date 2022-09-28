import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa o Header', () => {
  it('Testa o Header', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
  });
  it('Testa o nome da pagina', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    const pageName = screen.getByTestId('page-title');
    expect(pageName).toBeInTheDocument();
  });
  it('Testa o Search Icon', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    const search = screen.getByTestId('search-top-btn');
    expect(search).toBeInTheDocument();
  });
  it('Testa a funcionalidade do searchIcon', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    const search = await screen.findByTestId('search-top-btn');
    userEvent.click(search);
    expect(screen.findByTestId('search-input'));
  });
  it('Testa o botão Profile', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    const profileButton = await screen.getByTestId('profile-top-btn');
    userEvent.click(profileButton);
    expect(history.location.pathname).toBe('/profile');
  });
  it('Testa o nome da pagina', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/favorite-recipes'));
    const pageNam = screen.getByText(/Favorite Recipes/i);
    expect(pageNam).toHaveTextContent('Favorite Recipes');
  });
});
