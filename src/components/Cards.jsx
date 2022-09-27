import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppRecipesContext from '../context/AppRecipesContext';

function Cards({ path }) {
  const { drinksCards, mealsCards } = useContext(AppRecipesContext);

  let render = [];

  if (path === '/meals') {
    render = mealsCards;
  }

  if (path === '/drinks') {
    render = drinksCards;
  }
  return (
    <div>
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
