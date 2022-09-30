import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchDrinksCards, fetchMealsCards } from '../service/fetchCards';
import AppRecipesContext from './AppRecipesContext';
import { ZERO, TWELVE } from '../tests/helpers/numbers';

const alertWarning = 'Sorry, we haven\'t found any recipes for these filters.';

function AppRecipesProvider({ children }) {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState({
    email: '',
  });
  const [drinksCards, setDrinkCards] = useState([]);
  const [mealsCards, setMealsCards] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [radioInput, setRadioInput] = useState('');
  const [favoriteRecipes, setFavoritesRecipes] = useState([]);

  useEffect(() => {
    async function mealsDataForCards() {
      const cards = await fetchMealsCards();
      setMealsCards(cards);
    }

    async function drinksDataForCards() {
      const cards = await fetchDrinksCards();
      setDrinkCards(cards);
    }

    mealsDataForCards();
    drinksDataForCards();
  }, []);

  async function fetchApi(url) {
    let api = [];
    try {
      const request = await fetch(url);
      const response = await request.json();
      api = response;
    } catch (error) {
      global.alert(alertWarning);
    }
    return api;
  }

  const apiMeals = async () => {
    let api = [];
    if (radioInput === 'ingredient') {
      api = await fetchApi(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
    }
    if (radioInput === 'name') {
      api = await fetchApi(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    }
    if (radioInput === 'first-letter') {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return null;
      }
      api = await fetchApi(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
    }
    if (api.meals === null) {
      global.alert(alertWarning);
      return null;
    }
    if (api.meals.length === 1) {
      setMealsCards(api.meals);
      console.log(api.meals);
      history.push(`/meals/${api.meals[0].idMeal}`);
      return null;
    }
    if (api.meals && api.meals.length >= TWELVE) {
      return setMealsCards(api.meals.slice(ZERO, TWELVE));
    }
    if (api.meals) {
      setMealsCards(api.meals.slice(ZERO, api.meals.length));
    }
  };

  const apiDrinks = async () => {
    let api = [];
    if (radioInput === 'ingredient') {
      api = await fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`);
    }
    if (radioInput === 'name') {
      api = await fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
    }
    if (radioInput === 'first-letter') {
      if (searchInput.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      api = await fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`);
    }
    if (api.drinks === null) {
      return global.alert(alertWarning);
    }
    if (api.drinks.length === 1) {
      setDrinkCards(api.drinks);
      history.push(`/drinks/${api.drinks[0].idDrink}`);
      return null;
    }
    if (api.drinks && api.drinks.length >= TWELVE) {
      return setDrinkCards(api.drinks.slice(ZERO, TWELVE));
    }
    if (api.drinks) {
      setDrinkCards(api.drinks.slice(ZERO, api.drinks.length));
    }
  };

  const context = {
    setUserEmail,
    userEmail,
    drinksCards,
    mealsCards,
    setDrinkCards,
    setMealsCards,
    searchInput,
    setSearchInput,
    setRadioInput,
    apiDrinks,
    apiMeals,
    favoriteRecipes,
    setFavoritesRecipes,
  };

  return (
    <AppRecipesContext.Provider value={ context }>
      {children}
    </AppRecipesContext.Provider>
  );
}

AppRecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppRecipesProvider;
