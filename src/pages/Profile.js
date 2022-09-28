import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppRecipesContext from '../context/AppRecipesContext';
import useLocalStorage from '../hooks/useLocalStorage';
import '../css/profile.css';
import done from '../images/done.png';
import favorite from '../images/favorite.png';
import logout from '../images/logout.png';

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
    <div className="container-profile-page">
      <Header />
      <Footer />
      <p className="profile-email" data-testid="profile-email">{localStorage.email}</p>
      <div className="container-profile-buttons">
        <button
          className="btn-profile"
          type="button"
          data-testid="profile-done-btn"
          onClick={ handleClickToDoneRecipes }
        >
          <img src={ done } alt="done logo" className="logo-profile" />
          Done Recipes
        </button>

        <button
          className="btn-profile btn-favorite"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ handleClickToFavoriteRecipes }
        >
          <img src={ favorite } alt="favorite logo" className="logo-profile" />
          Favorite Recipes
        </button>

        <button
          className="btn-profile"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClickToLogout }
        >
          <img src={ logout } alt="logout logo" className="logo-profile" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
