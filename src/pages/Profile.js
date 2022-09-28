import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppRecipesContext from '../context/AppRecipesContext';
import useLocalStorage from '../hooks/useLocalStorage';

function Profile() {
  const { userEmail } = useContext(AppRecipesContext);
  const [localStorage] = useLocalStorage('user', userEmail);
  if (localStorage) console.log(localStorage);
  return (
    <div>
      <Header />
      <Footer />
      <p data-testid="profile-email">{localStorage.email}</p>
      <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
    </div>
  );
}

export default Profile;
