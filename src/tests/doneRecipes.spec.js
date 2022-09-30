import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import render from './helpers/renderWithRouter';

const doneRecipes = '/done-recipes';
const horizontalImage0 = '0-horizontal-image';
const horizontalimage1 = '1-horizontal-image';
const horizontalName0 = '0-horizontal-name';
const horizontalShareBtn0 = '0-horizontal-share-btn';

const mockSetLocalStorage = () => global.localStorage.setItem('doneRecipes', JSON.stringify([
  {
    id: 11064,
    type: 'drink',
    nationality: '',
    category: 'ordinary Drink',
    alcoholicOrNot: 'alcoholic',
    name: 'banana Daiquiri',
    image: 'https://www.thecocktaildb.com/images/media/drink/k1xatq1504389300.jpg',
    doneDate: '29/09/2022',
    tags: ['fruity', 'orange'],
  },
  {
    id: 53013,
    type: 'meal',
    nationality: 'american',
    category: 'beef',
    alcoholicOrNot: '',
    name: 'Big Mac',
    image: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
    doneDate: '29/09/2022',
    tags: [''],
  },
]));

describe('<DoneRecipes />', () => {
  it('should test elements in screen', async () => {
    const { history } = render(<App />);
    mockSetLocalStorage();

    act(() => history.push(doneRecipes));
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    const buttonMeals = screen.getByTestId('filter-by-meal-btn');
    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');
    const title = screen.getByRole('heading', { name: /done recipes/i });
    const profileIcon = screen.getByTestId('profile-top-btn');
    const imageDrink0 = screen.getByAltText(/banana daiquiri/i);
    const titleDrink0 = screen.getByTestId(horizontalName0);
    const imageMeal0 = screen.getByAltText(/big mac/i);
    const titleMeal0 = screen.getByTestId('1-horizontal-name');
    const buttonShare0 = screen.getByTestId(horizontalShareBtn0);
    const buttonShare1 = screen.getByTestId('1-horizontal-share-btn');

    await waitFor(() => expect(title).toBeInTheDocument());

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
  it('should click in DRINKS have just six image in page', async () => {
    const { history } = render(<App />);
    mockSetLocalStorage();
    act(() => history.push(doneRecipes));
    const imageMeal0 = screen.getByTestId(horizontalimage1);
    const imageDrink0 = screen.getByTestId(horizontalImage0);
    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');

    expect(imageMeal0).toBeInTheDocument();
    userEvent.click(buttonDrinks);

    await waitFor(() => expect(imageMeal0).not.toBeInTheDocument());
    expect(imageDrink0).toBeInTheDocument();
  });
  it('should click MEALS button and have just one food image', async () => {
    const { history } = render(<App />);
    mockSetLocalStorage();
    act(() => history.push(doneRecipes));
    const imageDrink0 = screen.getByAltText(/banana daiquiri/i);
    const imageMeal0 = screen.getByAltText(/big mac/i);
    const buttonMeals = screen.getByTestId('filter-by-meal-btn');

    expect(imageMeal0).toBeInTheDocument();
    expect(imageDrink0).toBeInTheDocument();

    userEvent.click(buttonMeals);

    await waitFor(() => expect(screen.queryByAltText('banana daiquiri')).not.toBeInTheDocument());
    expect(screen.getByAltText(/big mac/i)).toBeInTheDocument();
  });
  it('should click in DRINK card and redirect to page of it', async () => {
    const { history } = render(<App />);
    mockSetLocalStorage();
    act(() => history.push(doneRecipes));
    const imageDrink0 = screen.getByAltText(/banana daiquiri/i);

    userEvent.click(imageDrink0);

    expect(screen.queryByAltText(/big mac/i)).not.toBeInTheDocument();
    expect(history.location.pathname).toBe('/drinks/11064');
  });
  it('should click in MEAL card and redirect to page of it', () => {
    const { history } = render(<App />);
    mockSetLocalStorage();
    act(() => history.push(doneRecipes));
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
    act(() => history.push(doneRecipes));
    const buttonShare0 = screen.getByTestId(horizontalShareBtn0);

    userEvent.click(buttonShare0);

    await waitFor(() => expect(screen.getByText(/link copied!/i)).toBeInTheDocument());
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
  it('should click share button and show "link copied!"', async () => {
    const { history } = render(<App />);
    mockSetLocalStorage();
    act(() => history.push(doneRecipes));
    const titleDrink0 = screen.getByTestId(horizontalName0);

    userEvent.click(titleDrink0);

    expect(history.location.pathname).toBe('/drinks/11064');
  });
  it('should go to donerecipes with localstorage equal NULL', async () => {
    const { history } = render(<App />);
    act(() => history.push(doneRecipes));
    const imageDrink0 = screen.queryByTestId(horizontalImage0);
    const titleDrink0 = screen.queryByTestId(horizontalName0);
    const imageMeal0 = screen.queryByTestId(horizontalimage1);
    const titleMeal0 = screen.queryByTestId('1-horizontal-name');

    expect(imageDrink0).not.toBeInTheDocument();
    expect(titleDrink0).not.toBeInTheDocument();
    expect(imageMeal0).not.toBeInTheDocument();
    expect(titleMeal0).not.toBeInTheDocument();
  });
});
