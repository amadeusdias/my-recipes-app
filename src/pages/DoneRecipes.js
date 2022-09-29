import React from 'react';
import Header from '../components/Header';

const mockEscroto = [0, 1];

function DoneRecipes() {
  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {/* //! AQUI DEVE ENTRAR UM MAP DESCENTE COM O QUE VIRÁ DA TELA DE PROGRESSO! */}
      {mockEscroto.map((item) => (
        <>
          <img
            data-testid={ `${item}-horizontal-image` }
            alt="imagem"
            src="imagem"
          />
          <p data-testid={ `${item}-horizontal-top-text` }>Categoria</p>
          <p data-testid={ `${item}-horizontal-name` }>Nome da receita</p>
          <p data-testid={ `${item}-horizontal-done-date` }>Texto da Data da Receita</p>
          <button
            type="button"
            data-testid={ `${item}-horizontal-share-btn` }
          >
            Share Recipe
          </button>
          <p data-testid={ `${item}-Pasta-horizontal-tag` }>Tags</p>
          <p data-testid={ `${item}-Curry-horizontal-tag` }>Tags</p>
        </>
      ))}

    </div>
  );
}

export default DoneRecipes;
