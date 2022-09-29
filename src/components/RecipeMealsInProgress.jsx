import React from 'react';
import { useParams } from 'react-router-dom';

function RecipeMealsInProgress() {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <p data-testid="recipe-title">titulo da receita</p>
      <img
        data-testid="recipe-photo"
        src="Link da imagem"
        alt="Link da imagem"
      />
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">texto da categoria </p>
      <p data-testid="instructions">texto de instruções</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
    </div>
  );
}

export default RecipeMealsInProgress;
