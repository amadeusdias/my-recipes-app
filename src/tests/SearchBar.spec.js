import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

function accessToMeals() {
  const email = screen.getByPlaceholderText(/e-mail/i);
  const password = screen.getByPlaceholderText(/password/i);
  const button = screen.getByTestId('login-submit-btn');

  userEvent.type(email, 'test@test.com');
  userEvent.type(password, '123456789');
  userEvent.click(button);
}

describe('test component <SearchBar />', () => {
  it('Testing inputs', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId('password-input');
    const password = screen.getByTestId('email-input');
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'test@test.com');
    userEvent.type(password, '123456789');
    userEvent.click(button);

    screen.getByTestId('search-top-btn');
  });
});
