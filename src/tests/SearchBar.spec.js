import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import dataMeals from './helpers/mockMeals';
import dataDrinks from './helpers/mockDrinks';

const searchButton = 'search-top-btn';
const searchedInput = 'search-input';
const searchedIngredient = 'ingredient-search-radio';

describe('test component <SearchBar />', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: dataMeals,
        drinks: dataDrinks,
      }),
    });
  });
  it('should inputs in screen', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    userEvent.click(screen.getByTestId(searchButton));

    const searchInput = screen.getByTestId(searchedInput);
    const ingredientInput = screen.getByTestId(searchedIngredient);
    const nameInput = screen.getByTestId('name-search-radio');
    const firstLetter = screen.getByTestId('first-letter-search-radio');

    expect(searchInput).toBeInTheDocument();
    expect(ingredientInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
  });
  it('should test if api is called with endpoint correct in meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    userEvent.click(screen.getByTestId(searchButton));

    const searchInput = screen.getByTestId(searchedInput);
    const ingredientInput = screen.getByTestId(searchedIngredient);
    const buttonSearch = screen.getByTestId('exec-search-btn');

    expect(searchInput).toBeInTheDocument();
    expect(ingredientInput).toBeInTheDocument();

    userEvent.type(searchInput, 'chicken');
    userEvent.click(ingredientInput);
    userEvent.click(buttonSearch);

    expect(ingredientInput).toBeChecked();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
    expect(screen.getByText('Chicken & mushroom Hotpot')).toHaveLength(2);
    expect(screen.getByText('Chicken Basquaise')).toBeInTheDocument();
  });
  it('should test if api is called with endpoint correct in drinks', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));

    userEvent.click(screen.getByTestId(searchButton));

    const searchInput = screen.getByTestId(searchedInput);
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const buttonSearch = screen.getByTestId('exec-search-btn');

    expect(searchInput).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();

    userEvent.type(searchInput, 't');
    userEvent.click(firstLetter);
    userEvent.click(buttonSearch);

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=t');
  });
});
