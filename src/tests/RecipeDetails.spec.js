import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import RecipeDetails from '../components/RecipeDetails';

describe('Testa a tela de Recipe Details', () => {
  it('Testa a tela de Recipe Details', () => {
    renderWithRouter(<RecipeDetails />);
  });
});
