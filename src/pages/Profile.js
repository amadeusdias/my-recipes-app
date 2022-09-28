import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppRecipesContext from '../context/AppRecipesContext';
import useLocalStorage from '../hooks/useLocalStorage';

function Profile() {
  const { userEmail } = useContext(AppRecipesContext);
  const [localStorage] = useLocalStorage('user', userEmail);
  const history = useHistory();

  function handleClickToDoneRecipes() {
    history.push('/done-recipes');
  }

  function handleClickToFavoriteRecipes() {
    history.push('/favorite-recipes');
  }

  function handleClickToLogout() {
    window.localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header />
      <Footer />
      <p data-testid="profile-email">{localStorage.email}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ handleClickToDoneRecipes }
      >
        Done Recipes
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleClickToFavoriteRecipes }
      >
        Favorite Recipes

      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClickToLogout }
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
