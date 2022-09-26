import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppRecipesContext from './AppRecipesContext';
import { fetchMealsCards, fetchDrinksCards } from '../service/fetchCards';
// import useFetch from '../hooks/useFetch';

function AppRecipesProvider({ children }) {
  // const { request, data } = useFetch();
  const [userEmail, setUserEmail] = useState({
    email: '',
  });
  const [drinksCards, setDrinkCards] = useState([]);
  const [mealsCards, setMealsCards] = useState([]);

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

  // useEffect(() => {
  //   async function mealsDataForCards() {
  //     const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  //     await request(url);
  //     const cards = await data ? data.meals.slice(ZERO, TWELVE) : null;
  //     setMealsCards(cards);
  //     console.log(mealsCards);
  //   }

  //   async function drinksDataForCards() {
  //     const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  //     await request(url);
  //     const cards = data ? data.drinks.slice(ZERO, TWELVE) : null;
  //     setDrinkCards(cards);
  //   }

  //   mealsDataForCards();
  //   drinksDataForCards();
  // }, []);

  const context = {
    setUserEmail,
    userEmail,
    drinksCards,
    mealsCards,
    setDrinkCards,
    setMealsCards,
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
