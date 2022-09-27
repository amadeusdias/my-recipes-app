import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mockMeals from './helpers/dataByIngredientMeals';
import mockDrinks from './helpers/dataByFirstLetterDrinks';

const searchButton = 'search-top-btn';
const searchedInput = 'search-input';
const searchedIngredient = 'ingredient-search-radio';

async function accessToMeals() {
  const email = screen.getByTestId('email-input');
  const password = screen.getByTestId('password-input');
  const button = screen.getByTestId('login-submit-btn');

  userEvent.type(email, 'test@test.com');
  userEvent.type(password, '123456789');
  userEvent.click(button);

  await waitFor(() => expect(screen.getByTestId(searchButton)).toBeInTheDocument());
}

describe('test component <SearchBar />', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: mockMeals,
        drinks: mockDrinks,
      }),
    });
  });
  it('should inputs in screen', async () => {
    renderWithRouter(<App />);

    await accessToMeals();
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
    renderWithRouter(<App />);

    await accessToMeals();
    userEvent.click(screen.getByTestId(searchButton));

    const searchInput = screen.getByTestId(searchedInput);
    const ingredientInput = screen.getByTestId(searchedIngredient);
    const buttonSearch = screen.getByTestId('exec-search-btn');

    expect(searchInput).toBeInTheDocument();
    expect(ingredientInput).toBeInTheDocument();

    userEvent.type(searchInput, 'lamb');
    userEvent.click(ingredientInput);
    userEvent.click(buttonSearch);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=lamb');
  });
  it('should test if api is called with endpoint correct in drinks', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: mockDrinks,
      }),
    });
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
