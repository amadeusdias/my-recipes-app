import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mock from './helpers/dataByIngredient';

const searchButton = 'search-top-btn';

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
  it('should inputs in screen', async () => {
    renderWithRouter(<App />);

    await accessToMeals();
    userEvent.click(screen.getByTestId(searchButton));

    const searchInput = screen.getByTestId('search-input');
    const ingredientInput = screen.getByTestId('ingredient-search-radio');
    const nameInput = screen.getByTestId('name-search-radio');
    const firtLetter = screen.getByTestId('first-letter-search-radio');

    expect(searchInput).toBeInTheDocument();
    expect(ingredientInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(firtLetter).toBeInTheDocument();
  });
  it('should text if api is called with endpoint correct', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: mock,
      }),
    });
    renderWithRouter(<App />);

    accessToMeals();
    userEvent.click(screen.getByTestId(searchButton));

    const searchInput = screen.getByTestId('search-input');
    const ingredientInput = screen.getByTestId('ingredient-search-radio');
    const buttonSearch = screen.getByTestId('exec-search-btn');

    expect(searchInput).toBeInTheDocument();
    expect(ingredientInput).toBeInTheDocument();

    userEvent.type(searchInput, 'lamb');
    userEvent.click(ingredientInput);
    userEvent.click(buttonSearch);

    expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${}`);
  });
});
