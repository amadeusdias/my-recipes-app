import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppRecipesContext from '../context/AppRecipesContext';
import { useParams } from 'react-router-dom';

function MealsDetails({ match: { params: { id } } }) {
  const { mealsCards } = useContext(AppRecipesContext);
  const [findMeal, setFindMeal] = useState([]);
  const [returnApiMeals, setReturnApiMeals] = useState('');
  const params = useParams();

  useEffect(() => {
    setFindMeal(mealsCards.filter((meal) => meal.idMeal === id));
  }, [mealsCards]);//eslint-disable-line

  useEffect(() => {
    const fetchMealsDetails = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`;
      const response = await fetch(url);
      const result = await response.json();
      setReturnApiMeals(result.meals[0]);
    };

    fetchMealsDetails();
  });

  console.log(returnApiMeals);

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
