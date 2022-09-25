import React, { useContext } from 'react';
import AppRecipesContext from '../context/AppRecipesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const { titlePage, showSearchIcon } = useContext(AppRecipesContext);

  const htmlSearchIcon = (
    <img
      src={ searchIcon }
      alt="search-icon"
      data-testid="search-top-btn"
    />
  );

  return (
    <div>
      <img
        src={ profileIcon }
        alt="profile-icon"
        data-testid="profile-top-btn"
      />
      { showSearchIcon ? htmlSearchIcon : null }
      <h2 data-testid="page-title">{ titlePage }</h2>
    </div>
  );
}

export default Header;
