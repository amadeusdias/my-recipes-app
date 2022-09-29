import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppRecipesContext from '../context/AppRecipesContext';
import '../css/searchBar.css';

function SearchBar() {
  const {
    searchInput,
    setSearchInput,
    setRadioInput,
    apiDrinks,
    apiMeals,
  } = useContext(AppRecipesContext);

  function handleRadioButton({ target }) {
    setRadioInput(target.value);
  }

  const location = useHistory();

  function getApiResponse() {
    if (location.location.pathname.includes('meals')) {
      apiMeals();
    }
    if (location.location.pathname.includes('drinks')) {
      apiDrinks();
    }
  }

  return (
    <form className="search-bar">
      <input
        className="input-search-input"
        placeholder="Search"
        type="text"
        data-testid="search-input"
        onChange={ ({ target }) => setSearchInput(target.value) }
        value={ searchInput }
      />
      <div className="down-search-bar">
        <div className="radio-buttons-search-bar">
          <label htmlFor="ingredient">
            <input
              type="radio"
              name="type-of-search"
              id="ingredient"
              data-testid="ingredient-search-radio"
              onClick={ handleRadioButton }
              value="ingredient"
            />
            Ingredient
          </label>

          <label htmlFor="name">
            <input
              type="radio"
              name="type-of-search"
              id="name"
              data-testid="name-search-radio"
              onClick={ handleRadioButton }
              value="name"
            />
            Name
          </label>

          <label htmlFor="first-letter">
            <input
              type="radio"
              name="type-of-search"
              id="first-letter"
              data-testid="first-letter-search-radio"
              onClick={ handleRadioButton }
              value="first-letter"
            />
            First letter
          </label>
        </div>

        <button
          className="btn-search"
          type="button"
          data-testid="exec-search-btn"
          onClick={ getApiResponse }
        >
          SEARCH
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
