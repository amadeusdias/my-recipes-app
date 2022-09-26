import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AppRecipesContext from './AppRecipesContext';
import { fetchMealsCards, fetchDrinksCards } from '../service/fetchCards';

function AppRecipesProvider({ children }) {
  const [userEmail, setUserEmail] = useState({
    email: '',
  });
  const [drinksCards, setDrinkCards] = useState([]);
  const [mealsCards, setMealsCards] = useState([]);
  const [foods, setFoods] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [radioInput, setRadioInput] = useState('');

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
    const request = await fetch(url);
    const response = await request.json();

    return response.meals;
  }

  function radioInputByIngredient() {
    if (useHistory.location.pathname === /meals/) {
      fetchData = async () => {
        const api = await fetchApi(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
        setFoods(api);
      };
      return null;
    }
    fetchData = async () => {
      const api = await fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`);
      setFoods(api);
    };
  }

  function radioInputByName() {
    if (useHistory.location.pathname === /meals/) {
      fetchData = async () => {
        const api = await fetchApi(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
        setFoods(api);
      };
      return null;
    }
    fetchData = async () => {
      const api = await fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
      setFoods(api);
    };
  }

  function radioInputByFirstLetter() {
    if (searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return null;
    }
    if (useHistory.location.pathname === /meals/) {
      fetchData = async () => {
        const api = await fetchApi(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
        setFoods(api);
      };
      return null;
    }
    fetchData = async () => {
      const api = await fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`);
      setFoods(api);
    };
  }

  function getApiResponse(location) {
    if (location === /meals/i) {
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
