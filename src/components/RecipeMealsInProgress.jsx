import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VINTE = 20;
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
  }, []);

  for (let index = 0; index <= VINTE; index += 1) {
    if (returnApiMeals && returnApiMeals[`strIngredient${index}`]) {
      ingredients.push(returnApiMeals[`strIngredient${index}`]);
    }
  }

  console.log(ingredients);

  return (
    <div>
      <p data-testid="recipe-title">{returnApiMeals.strArea}</p>
      <img
        data-testid="recipe-photo"
        src={ returnApiMeals.strMealThumb }
        alt={ returnApiMeals.strArea }
      />
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{ returnApiMeals.strCategory }</p>
      <p data-testid="instructions">{returnApiMeals.strInstructions}</p>

      {ingredients.map((element) => (
        <label key={ element } htmlFor={ element } data-testid="ingredient-step">
          {element}
          <input name={ element } type="checkbox" />
        </label>
      ))}

      <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
    </div>

  );
}
export default RecipeMealsInProgress;
