import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import pageDrinks from '../images/drinkIcon.svg';
import headerIcon from '../images/headerIcon.svg';
import pageMeals from '../images/mealIcon.svg';
import pageDone from '../images/pageDone.svg';
import pageProfile from '../images/pageProfile.svg';
import profileIcon from '../images/profileIcon.svg';
import recipesApp from '../images/recipesApp.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

import '../css/header.css';

function Header() {
  const [showSearchIcon, setShowSearchIcon] = useState(false);
  const [pageName, setPageName] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const hlp = history.location.pathname;

  function formatPageName(name) {
    const SEIS = 7;
    const tittle = name.substring(1);
    if (tittle.length <= SEIS) {
      return tittle.charAt(0).toUpperCase() + tittle.substr(1);
    }
    const result = tittle.split('-');
    const word1 = result[0];
    const word2 = result[1];
    return `${word1.charAt(0).toUpperCase() + word1.substr(1)} 
    ${word2.charAt(0).toUpperCase() + word2.substr(1)}`;
  }

  useEffect(() => {
    setPageName(formatPageName(location.pathname));
    if (location.pathname === '/meals' || location.pathname === '/drinks') {
      setShowSearchIcon(true);
    }
  }, [location.pathname]);

  function handleSearch() {
    setShowSearch(!showSearch);
  }

  const htmlSearchIcon = (
    <button
      type="button"
      onClick={ handleSearch }
      // className="btn-search"
    >
      <img
        src={ searchIcon }
        alt="search-icon"
        data-testid="search-top-btn"
      />
    </button>
  );
  function handleClick() {
    history.push('/profile');
  }

  return (
    <header>
      <div className="container-top-bar">
        <img src={ headerIcon } alt="headerIcon" />
        <img src={ recipesApp } alt="recipesApp" />
        <div>
          { showSearchIcon ? htmlSearchIcon : null }
          <button
            type="button"
            onClick={ handleClick }
            // className="btn-profile"
          >
            <img
              src={ profileIcon }
              alt="profile-icon"
              data-testid="profile-top-btn"
            />

          </button>

        </div>
      </div>
      <div className="teste">
        { hlp.includes('/meals') ? <img src={ pageMeals } alt="mealsIcon" /> : null}
        { hlp.includes('/drinks') ? <img src={ pageDrinks } alt="drinksIcon" /> : null}
        { hlp.includes('/profile') ? <img src={ pageProfile } alt="profileIcon" /> : null}
        { hlp.includes('/done-recipes') ? <img src={ pageDone } alt="pageDone" /> : null}
        <h2 data-testid="page-title" className="title-page-title">{pageName }</h2>
        {showSearch ? <SearchBar /> : null}
      </div>
    </header>
  );
}

export default Header;
