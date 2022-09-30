import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import favorite from '../images/favorite2.svg';
import share from '../images/share.svg';
import { VINTE } from '../tests/helpers/numbers';

function RecipeMealsInProgress() {
  const [returnApiMeals, setReturnApiMeals] = useState([]);
  const params = useParams();
  const ingredients = [];

  useEffect(() => {
    const fetchMealsDetails = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`;
      const response = await fetch(url);
      const result = await response.json();
      setReturnApiMeals(result.meals[0]);
    };
    fetchMealsDetails();
  }, []); // eslint-disable-line

  for (let index = 0; index <= VINTE; index += 1) {
    if (returnApiMeals && returnApiMeals[`strIngredient${index}`]) {
      ingredients.push(returnApiMeals[`strIngredient${index}`]);
    }
  }

  return (
    <div className="container-meals-details">
      <div>
        <button
          type="button"
          className="icon-share"
          data-testid="share-btn"
        >
          <img src={ share } alt="favorite" />
        </button>
        <button
          type="button"
          className="icon-favorite"
          data-testid="favorite-btn"
        >
          <img src={ favorite } alt="favorite" />
        </button>
        <div className="container-img-meals">
          <img
            className="img-meals-details"
            data-testid="recipe-photo"
            src={ returnApiMeals.strMealThumb }
            alt={ returnApiMeals.strArea }
          />
        </div>
        <h3 data-testid="recipe-title" className="title-food">
          {returnApiMeals.strArea}
        </h3>
        <p data-testid="recipe-category">{ returnApiMeals.strCategory }</p>

        {ingredients.map((element) => (
          <label
            key={ element }
            htmlFor={ element }
            data-testid="ingredient-step"
          >
            {element}
            <input
              name={ element }
              id={ element }
              type="checkbox"
            />
          </label>
        ))}

        <h2 className="title-meals-details">Instructions:</h2>
        <p
          data-testid="instructions"
          className="instructions"
        >
          {returnApiMeals.strInstructions}
        </p>
      </div>

      <button
        className="scroll-btn"
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar

      </button>
    </div>

  );
}

export default RecipeMealsInProgress;
