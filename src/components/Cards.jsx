import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppRecipesContext from '../context/AppRecipesContext';

const ZERO = 0;
const FIVE = 5;

function Cards({ path }) {
  const { drinksCards,
    mealsCards,
  } = useContext(AppRecipesContext);
  const [list5Meals, setList5Meals] = useState([]);
  const [list5Drinks, setList5Drinks] = useState([]);

  useEffect(() => {
    async function get5MealsCategory() {
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(url);
      const result = await response.json();
      setList5Meals(result.meals.slice(ZERO, FIVE));
    }

    async function get5DrinksCategory() {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(url);
      const result = await response.json();
      setList5Drinks(result.drinks.slice(ZERO, FIVE));
    }
    get5MealsCategory();
    get5DrinksCategory();
  }, []);

  console.log(list5Meals);
  // console.log(list5Drinks);

  let render = [];
  if (path === '/meals') {
    render = mealsCards;
  }

  if (path === '/drinks') {
    render = drinksCards;
  }

  // console.log(path);

  return (
    <div>
      {list5Meals && path === '/meals' && list5Meals.map((item, index) => (
        <div
          key={ index }
        >
          <button
            type="button"
            data-testid={ `${item.strCategory}-category-filter` }
          >
            {item.strCategory}
          </button>
        </div>
      ))}
      {list5Drinks && path === '/drinks' && list5Drinks.map((item, index) => (
        <div
          key={ index }
          id=""
        >
          <button
            type="button"
            data-testid={ `${item.strCategory}-category-filter` }
          >
            {item.strCategory}
          </button>
        </div>
      ))}
      {render.map((item, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ path === '/meals' ? item.strMealThumb : item.strDrinkThumb }
            alt={ item }
          />

          <h2 data-testid={ `${index}-card-name` }>
            {path === '/meals' ? item.strMeal : item.strDrink}
          </h2>
        </div>
      ))}
    </div>
  );
}

Cards.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Cards;
