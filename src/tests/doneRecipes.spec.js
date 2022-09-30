import React from 'react';
import { act, screen } from '@testing-library/react';
import App from '../App';
import render from './helpers/renderWithRouter';

describe('<DoneRecipes />', () => {
  beforeEach(() => {
    global.localStorage.setItem('doneRecipes', JSON.stringify([
      {
        id: 11064,
        type: 'drinks',
        nationality: '',
        category: 'ordinary Drink',
        alcoholicOrNot: 'alcoholic',
        name: 'banana Daiquiri',
        image: 'https://www.thecocktaildb.com/images/media/drink/k1xatq1504389300.jpg',
        doneDate: '29/09/2022',
        tags: ['fruity'],
      },
      {
        id: 53013,
        type: 'meals',
        nationality: 'american',
        category: 'beef',
        alcoholicOrNot: '',
        name: 'Big Mac',
        image: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
        doneDate: '29/09/2022',
        tags: [''],
      },
    ]));
  });
  afterEach(() => {
    global.localStorage.removeItem('doneRecipes');
  });
  it('should test elements in screen', () => {
    const { history } = render(<App />);
    act(() => history.push('/done-recipes'));
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    const buttonMeals = screen.getByTestId('filter-by-meal-btn');
    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');
    const title = screen.getByRole('heading', { name: /done recipes/i });
    const profileIcon = screen.getByTestId('profile-top-btn');
    const imageDrink0 = screen.getByTestId('0-horizontal-image');
    const titleDrink0 = screen.getByTestId('0-horizontal-name');
    const imageMeal0 = screen.getByTestId('1-horizontal-image');
    const titleMeal0 = screen.getByTestId('1-horizontal-name');
    const buttonShare0 = screen.getByTestId('0-horizontal-share-btn');
    const buttonShare1 = screen.getByTestId('1-horizontal-share-btn');

    expect(buttonAll).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(imageDrink0).toBeInTheDocument();
    expect(titleDrink0).toBeInTheDocument();
    expect(imageMeal0).toBeInTheDocument();
    expect(titleMeal0).toBeInTheDocument();
    expect(buttonShare0).toBeInTheDocument();
    expect(buttonShare1).toBeInTheDocument();
  });
});
