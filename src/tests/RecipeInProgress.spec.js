import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import dataMeals from './helpers/mockMeals';
import dataDrinks from './helpers/mockDrinks';
import App from '../App';

describe('Testa a tela de Recipe in Progress', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: dataMeals,
        drinks: dataDrinks,
      }),
    });
    global.localStorage.setItem('user', JSON.stringify({ email: 'batata@gmail.com' }));
    const favoriteRecipes = [{
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    }];
    const favoriteRecipesDrinks = [{
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesDrinks));
  });
  it('Testa a tela de Recipe em progresso - meals', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals/52771/in-progress');
    expect(window.location.pathname).toBe('http://localhost:3000/meals/52771/in-progress');
  });
  it('Testa a tela de Receitas em progesso - drinks', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319/in-progress');
    expect(window.location.pathname).toBe('http://localhost:3000/drinks/178319/in-progress');
  });
});
