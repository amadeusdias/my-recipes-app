import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import YoutubeEmbed from './YoutubeEmbed';
import AppRecipesContext from '../context/AppRecipesContext';
import { ingredients } from '../tests/helpers/numbers';

function MealsDetails({ match: { params: { id } } }) {
  const { mealsCards } = useContext(AppRecipesContext);
  const [findMeal, setFindMeal] = useState([]);
  const [returnApiMeals, setReturnApiMeals] = useState([]);
  // const [returnAllMeals, setReturnAllMeals] = useState([]);
  const params = useParams();

  const cleanEmpty = (obj) => {
    const clean = Object.fromEntries(Object.entries(obj)
      .filter(([, v]) => v != null || v !== '' || v !== ' '));
    return Array(clean);
  };
  console.log(findMeal);

  useEffect(() => {
    setFindMeal(mealsCards.filter((meal) => meal.idMeal === id));
  }, [mealsCards]); // eslint-disable-line

  useEffect(() => {
    const fetchMealsDetails = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`;
      const response = await fetch(url);
      const result = await response.json();
      setReturnApiMeals(result.meals[0]);
    };

    fetchMealsDetails();
  }, []); // eslint-disable-line

  const TRINTAEDOIS = 32;

  // const ingredients = [];
  // const maxIngredientes = 20;
  // for (let i = 0; i < maxIngredientes; i += 1) {
  //   if (returnApiMeals && returnApiMeals[`strIngredient${i}`]) {
  //     ingredients.push(returnApiMeals[`strIngredient${i}`]);
  //   }
  // }

  // console.log(ingredients);

  return (
    <div>
      {cleanEmpty(returnApiMeals).map((item, index) => (
        <div key={ index }>
          <h3 data-testid="recipe-title">{item.strMeal}</h3>
          <p data-testid="recipe-category">
            Category:
            {item.strCategory}
          </p>
          <ul>
            {ingredients.map((indexI) => returnApiMeals[`strIngredient${indexI}`]?.length
            > 0 && (
              <li
                key={ returnApiMeals[`strIngredient${indexI}`] }
                data-testid={ `${indexI - 1}-ingredient-name-and-measure` }
              >
                {returnApiMeals[`strIngredient${indexI}`]}
                {returnApiMeals[`strMeasure${indexI}`]}
              </li>
            ))}
          </ul>
          <p data-testid="instructions">
            Instructions:
            {item.strInstructions}
          </p>
          <img
            data-testid="recipe-photo"
            src={ item.strMealThumb }
            alt={ item.strMeal }
          />
          <div>
            <YoutubeEmbed
              data-testid="video"
              embedId={ item.strYoutube
                ? item.strYoutube.slice(TRINTAEDOIS) : null }
            />

          </div>
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
