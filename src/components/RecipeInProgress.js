import React from 'react';
import { useHistory } from 'react-router-dom';
import RecipeDrinkInProgress from './RecipeDrinkInProgress';
import RecipeMealsInProgress from './RecipeMealsInProgress';

function RecipeInProgress() {
  const history = useHistory();
  return (
    <div>
      {history.location.pathname.includes('meals') ? <RecipeMealsInProgress />
        : <RecipeDrinkInProgress />}
    </div>

  );
}

export default RecipeInProgress;
