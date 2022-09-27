import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AppRecipesContext from './AppRecipesContext';
import { fetchMealsCards, fetchDrinksCards } from '../service/fetchCards';

// const ZERO = 0;
// const TWELVE = 12;

function AppRecipesProvider({ children }) {
  const location = useHistory();
  const [userEmail, setUserEmail] = useState({
    email: '',
  });
  // const [allMeals, setAllMeals] = useState([]);
  // const [allDrinks, setAllDrinks] = useState([]);
  const [drinksCards, setDrinkCards] = useState([]);
  const [mealsCards, setMealsCards] = useState([]);
  const [foods, setFoods] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [radioInput, setRadioInput] = useState('');

  useEffect(() => {
    async function mealsDataForCards() {
      const cards = await fetchMealsCards();
      // const cards12List = cards.meals.slice(ZERO, TWELVE);
      setMealsCards(cards);
      // setAllMeals(cards.meals);
    }

    async function drinksDataForCards() {
      const cards = await fetchDrinksCards();
      // const cards12List = cards.drinks.slice(ZERO, TWELVE);
      setDrinkCards(cards);
      // setAllDrinks(cards.drinks);
    }

    mealsDataForCards();
    drinksDataForCards();
  }, []);

  // console.log(allMeals);
  // console.log(allDrinks);

  async function fetchApi(url) {
    const request = await fetch(url);
    const response = await request.json();

    return response.meals;
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
      if (radioInput.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      api = await fetchApi(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
    }
    console.log(api);
    setFoods(api);
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
      if (radioInput.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      api = await fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`);
    }
    setFoods(api);
  };

  function getApiResponse() {
    if (location.location.pathname === /meals/i) {
      apiMeals();
    }
    if (location.location.pathname === /drinks/i) {
      apiDrinks();
    }
  }

  const context = {
    setUserEmail,
    userEmail,
    drinksCards,
    mealsCards,
    setDrinkCards,
    setMealsCards,
    setFoods,
    foods,
    searchInput,
    setSearchInput,
    radioInput,
    setRadioInput,
    getApiResponse,
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
