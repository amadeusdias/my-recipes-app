import React, { useContext } from 'react';
import AppRecipesContext from '../context/AppRecipesContext';

function SearchBar() {
  const {
    searchInput,
    setSearchInput,
    setRadioInput,
    getApiResponse } = useContext(AppRecipesContext);

  function handleRadioButton({ target }) {
    setRadioInput(target.value);
  }

  return (
    <div>
      <form>
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

        <input
          type="text"
          data-testid="search-input"
          onChange={ ({ target }) => setSearchInput(target.value) }
          value={ searchInput }
        />

        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ getApiResponse }
        >
          SEARCH
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
