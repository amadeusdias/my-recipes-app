import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import render from './helpers/renderWithRouter';

const favoriteRecipe = '/favorite-recipes';

const mockSetLocalStorage = () => global.localStorage.setItem('favoriteRecipes', JSON.stringify([
  {
    id: 11064,
    type: 'drink',
    nationality: '',
    category: 'ordinary Drink',
    alcoholicOrNot: 'alcoholic',
    name: 'banana Daiquiri',
    image: 'https://www.thecocktaildb.com/images/media/drink/k1xatq1504389300.jpg',
  },
  {
    id: 53013,
    type: 'meal',
    nationality: 'american',
    category: 'beef',
    alcoholicOrNot: '',
    name: 'Big Mac',
    image: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
  },
]));

describe('<Favorite />', () => {
  it('should test elements in screen', () => {
    const { history } = render(<App />);
    mockSetLocalStorage();
    act(() => history.push(favoriteRecipe));

    expect(screen.getByTestId('page-title')).toBeInTheDocument();
  });
  it('should click in MEALS have just one image ', async () => {
    const { history } = render(<App />);
    mockSetLocalStorage();
    act(() => history.push(favoriteRecipe));
    userEvent.click(screen.getByTestId('filter-by-meal-btn'));

    expect(screen.queryByAltText(/banana daiquiri/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/big mac/i)).toBeInTheDocument();
  });
  it('should click DRINKS button and have just one food image', () => {
    const { history } = render(<App />);
    mockSetLocalStorage();
    act(() => history.push(favoriteRecipe));
    const drinksButton = screen.getByTestId('filter-by-drink-btn');
    const drinkImg = screen.queryByAltText(/banana daiquiri/i);
    const mealImg = screen.queryByAltText(/big mac/i);

    expect(drinkImg).toBeInTheDocument();
    expect(mealImg).toBeInTheDocument();

    userEvent.click(drinksButton);

    expect(screen.queryByAltText(/big mac/i)).not.toBeInTheDocument();
    expect(screen.queryByAltText(/banana daiquiri/i)).toBeInTheDocument();
  });
  it('should click in DRINK card and redirect to page of it', () => {
    const { history } = render(<App />);
    mockSetLocalStorage();
    act(() => history.push(favoriteRecipe));
    const imageDrink0 = screen.getByAltText(/banana daiquiri/i);

    userEvent.click(imageDrink0);

    expect(screen.queryByAltText(/big mac/i)).not.toBeInTheDocument();
    expect(history.location.pathname).toBe('/drinks/11064');
  });
  it('should click in MEAL card and redirect to page of it', () => {
    const { history } = render(<App />);
    mockSetLocalStorage();
    act(() => history.push(favoriteRecipe));
    const imageMeal0 = screen.getByAltText(/big mac/i);
    const ima = screen.getByAltText(/banana daiquiri/i);

    expect(ima).toBeInTheDocument();
    expect(imageMeal0).toBeInTheDocument();

    userEvent.click(imageMeal0);

    expect(screen.queryByText(/banana daiquiri/i)).not.toBeInTheDocument();
    expect(history.location.pathname).toBe('/meals/53013');
  });
  it('should click share button and show "link copied!"', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => { 'link copied!'; },
      },
    });
    jest.spyOn(navigator.clipboard, 'writeText');
    const { history } = render(<App />);
    mockSetLocalStorage();
    act(() => history.push(favoriteRecipe));
    const buttonShare0 = screen.getByTestId('0-horizontal-share-btn');

    userEvent.click(buttonShare0);

    await waitFor(() => expect(screen.getByText(/link copied!/i)).toBeInTheDocument());
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
  it('should click share button and show "link copied!"', async () => {
    const { history } = render(<App />);
    mockSetLocalStorage();
    act(() => history.push(favoriteRecipe));
    const titleDrink0 = screen.getByTestId('0-horizontal-name');

    userEvent.click(titleDrink0);

    expect(history.location.pathname).toBe('/drinks/11064');
  });
  it('should go to favoriterecipes with localstorage equal NULL', async () => {
    const { history } = render(<App />);
    global.localStorage.clear();
    act(() => history.push(favoriteRecipe));

    const imageDrink0 = screen.queryByTestId('0-horizontal-image');
    const titleDrink0 = screen.queryByTestId('0-horizontal-name');
    const imageMeal0 = screen.queryByTestId('1-horizontal-image');
    const titleMeal0 = screen.queryByTestId('1-horizontal-name');
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    const buttonMeals = screen.getByTestId('filter-by-meal-btn');
    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');

    expect(buttonAll).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();
    expect(imageDrink0).not.toBeInTheDocument();
    expect(titleDrink0).not.toBeInTheDocument();
    expect(imageMeal0).not.toBeInTheDocument();
    expect(titleMeal0).not.toBeInTheDocument();
  });
  it('should remove a food favorite', async () => {
    const { history } = render(<App />);
    mockSetLocalStorage();
    act(() => history.push(favoriteRecipe));
    const drinkDesfavButton = screen.getByTestId('0-horizontal-favorite-btn');
    const titleDrink = screen.getByText(/banana daiquiri/i);
    const imageDrink = screen.getByAltText(/banana daiquiri/i);

    expect(titleDrink).toBeInTheDocument();
    expect(imageDrink).toBeInTheDocument();

    userEvent.click(drinkDesfavButton);

    expect(screen.queryByAltText(/banana daiquiri/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/banana daiquiri/i)).not.toBeInTheDocument();
  });
});
