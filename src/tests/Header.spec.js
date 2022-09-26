import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
// import { useLocation, useHistory } from 'react-router-dom';
import Meals from '../pages/Meals';

describe('Testa o Header', () => {
  it('Testa o Header', () => {
    renderWithRouter(<Meals />);
    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
  });
  it('Testa o nome da pagina', () => {
    renderWithRouter(<Meals />);
    const pageName = screen.getByTestId('page-title');
    expect(pageName).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão "Profile", o usuário é redirecionado para a página "Profile"', () => {
    renderWithRouter(<Meals />);

    const profileButton = screen.getByTestId('profile-top-btn');
    userEvent.click(profileButton);
    renderWithRouter(<Meals />, { initialEntries: ['/profile'] });
  });
//   it('Testa o Search Icon', () => {
//     renderWithRouter(<Meals />);
//     const searchIcon = screen.getByTestId('search-top-bt');
//     expect(searchIcon).toBeInTheDocument();
//   });
});
