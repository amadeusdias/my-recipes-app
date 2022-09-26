import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [showSearchIcon, setShowSearchIcon] = useState(false);
  const [pageName, setPageName] = useState('');
  const location = useLocation();
  const history = useHistory();

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
    // const format = tittle.charAt(0).toUpperCase() + tittle.substr(1);
    // return format.replace('-', ' ');
  }

  useEffect(() => {
    setPageName(formatPageName(location.pathname));
    if (location.pathname === '/meals' || location.pathname === '/drinks') {
      setShowSearchIcon(true);
    }
  }, [location.pathname]);

  const htmlSearchIcon = (
    <img
      src={ searchIcon }
      alt="search-icon"
      data-testid="search-top-btn"
    />
  );
  function handleClick() {
    history.push('/profile');
  }

  return (
    <div>
      <button
        type="button"
        onClick={ handleClick }
      >
        <img
          src={ profileIcon }
          alt="profile-icon"
          data-testid="profile-top-btn"
        />

      </button>
      { showSearchIcon ? htmlSearchIcon : null }
      <h2 data-testid="page-title">{pageName }</h2>
    </div>
  );
}

export default Header;
