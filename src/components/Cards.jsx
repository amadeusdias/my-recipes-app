import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppRecipesContext from '../context/AppRecipesContext';
import { fetchCategoryMeals, fetchCategoryDrinks } from '../service/fetchCards';
import '../css/cards.css';
import { ZERO, FIVE, TWELVE } from '../tests/helpers/numbers';

const tres = 3;

function Cards({ path }) {
  const { drinksCards,
    mealsCards,
  } = useContext(AppRecipesContext);
  const [list5Meals, setList5Meals] = useState([]);
  const [list5Drinks, setList5Drinks] = useState([]);
  const [filteredMeal, setFilteredMeal] = useState('');
  const [filteredDrinks, setFilteredDrinks] = useState('');

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
  }, [filteredMeal]);

  let render = [];
  if (!filteredMeal && !filteredDrinks) {
    if (path === '/meals') {
      render = mealsCards;
    }

    if (path === '/drinks') {
      render = drinksCards;
    }
  }

  async function handleClickFiltered({ target: { name } }) {
    if (path === '/meals') {
      if (filteredMeal.length === 0) {
        const filteredResult = await fetchCategoryMeals(name);
        setFilteredMeal(filteredResult.slice(ZERO, TWELVE));
      } else setFilteredMeal('');
    }
    if (path === '/drinks') {
      if (filteredDrinks.length === 0) {
        const filteredResult = await fetchCategoryDrinks(name);
        setFilteredDrinks(filteredResult.slice(ZERO, TWELVE));
      } else setFilteredDrinks('');
    }
  }

  function handleClickResetFilters() {
    setFilteredMeal('');
    setFilteredDrinks('');
  }

  return (
    <div className="container-recipe-card">

      <button
        className={ path === '/meals' ? 'All-icon-meals' : 'All-icon-drinks' }
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClickResetFilters }
      >
        {/* All */}
      </button>

      {list5Meals && path === '/meals' && list5Meals.map((item, index) => (
        <div
          key={ index }
        >
          <button
            className={ `${item.strCategory}-icon` }
            type="button"
            data-testid={ `${item.strCategory}-category-filter` }
            onClick={ handleClickFiltered }
            name={ item.strCategory }
          >
            {/* {item.strCategory} */}
          </button>
        </div>
      ))}

      {list5Drinks && path === '/drinks' && list5Drinks.map((item, index) => (
        <div
          key={ index }
          id=""
        >
          <button
            className={ `${index === tres ? 'other' : item.strCategory}-icon` }
            type="button"
            data-testid={ `${item.strCategory}-category-filter` }
            onClick={ handleClickFiltered }
            name={ item.strCategory }
          >
            {/* {item.strCategory} */}
          </button>
        </div>
      ))}

      {render.map((item, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
          className="recipe-card"
        >
          <Link
            to={ path === '/meals' ? `/meals/${item.idMeal}`
              : `/drinks/${item.idDrink}` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ path === '/meals' ? item.strMealThumb : item.strDrinkThumb }
              alt={ item }
            />
          </Link>

          <h2 data-testid={ `${index}-card-name` }>
            {path === '/meals' ? item.strMeal : item.strDrink}
          </h2>
        </div>
      ))}
      {filteredMeal && filteredMeal.map((item, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` } className="recipe-card">
          <img
            src={ item.strMealThumb }
            alt={ item.strMeal }
            id={ item.idMeal }
            data-testid={ `${index}-card-img` }
          />
          <h2 data-testid={ `${index}-card-name` }>{item.strMeal}</h2>
        </div>
      ))}
      {filteredDrinks && filteredDrinks.map((item, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` } className="recipe-card">
          <img
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
            id={ item.idDrink }
            data-testid={ `${index}-card-img` }
          />
          <h2 data-testid={ `${index}-card-name` }>{item.strDrink}</h2>
        </div>
      ))}
    </div>
  );
}

Cards.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Cards;
