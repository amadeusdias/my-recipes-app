import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppRecipesContext from '../context/AppRecipesContext';

function MealsDetails({ match: { params: { id } } }) {
  const { mealsCards } = useContext(AppRecipesContext);
  const [findMeal, setFindMeal] = useState([]);

  useEffect(() => {
    setFindMeal(mealsCards.filter((meal) => meal.idMeal === id));
  }, [mealsCards]);

  return (
    <div>
      {findMeal.map((item, index) => (
        <div key={ index }>
          <p>{item.strInstructions}</p>
          <img src={ item.strMealThumb } alt={ item.strMeal } />
        </div>
      ))}
    </div>
  );
}

MealsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default MealsDetails;
