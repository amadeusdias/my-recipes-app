import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import AppRecipesContext from '../context/AppRecipesContext';
import { VINTE } from '../tests/helpers/numbers';
import blackHearthIcon from '../images/blackHeartIcon.svg';
import whiteHearthIcon from '../images/whiteHeartIcon.svg';
import '../css/doneRecipes.css';

function RecipeInProgress() {
  const {
    favoriteRecipes,
    setFavoritesRecipes,
  } = useContext(AppRecipesContext);
  const history = useHistory();
  const [returnApiDrinks, setReturnApiDrinks] = useState('');
  const [shareCopy, setShareCopy] = useState(false);
  const [iconHeart, setIconHeart] = useState(false);
  const params = useParams();
  const ingredients = [];

  useEffect(() => {
    const fetchDrinksDetails = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`;
      const response = await fetch(url);
      const result = await response.json();
      setReturnApiDrinks(result.drinks[0]);
    };
    fetchDrinksDetails();
  }, []); // eslint-disable-line
  console.log(returnApiDrinks);

  useEffect(() => {
    const favoriteFoods = JSON.parse(localStorage.getItem(('favoriteRecipes'))) || [];
    const isFavorite = favoriteFoods.some((f) => f.id === params.id);
    setIconHeart(isFavorite);
  }, [favoriteRecipes]); // eslint-disable-line

  useEffect(() => {
    setFavoritesRecipes('');
    setFavoritesRecipes([
      ...favoriteRecipes,
      {
        id: returnApiDrinks.idDrink,
        type: 'drink',
        nationality: '',
        category: returnApiDrinks.strCategory,
        alcoholicOrNot: returnApiDrinks.strAlcoholic,
        name: returnApiDrinks.strDrink,
        image: returnApiDrinks.strDrinkThumb,
      }].filter((item) => item.id));
  }, [returnApiDrinks]);

  for (let index = 0; index <= VINTE; index += 1) {
    if (returnApiDrinks && returnApiDrinks[`strIngredient${index}`]) {
      ingredients.push(returnApiDrinks[`strIngredient${index}`]);
    }
  }

  function handleClickFavoriteRecipes() {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipes),
    );
    const toggleHeart = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(toggleHeart);
    if (toggleHeart.find((local) => local.id !== params.id)) {
      localStorage.removeItem('favoriteRecipes');
    } // lógica para retirar item do localStorage;
    setIconHeart(!iconHeart);
  }

  function handleClickShareBtn() {
    const inProgress = window.location.pathname.indexOf('/in-progress');
    const link = window.location.pathname.slice(0, inProgress);
    copy(`http://localhost:3000${link}`);
    setShareCopy(!shareCopy);
  }

  return (
    <div>
      <p data-testid="recipe-title">{returnApiDrinks.strDrink}</p>
      <img
        data-testid="recipe-photo"
        className="img-fdp"
        src={ returnApiDrinks.strDrinkThumb }
        alt={ returnApiDrinks.strDrink }
      />
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleClickShareBtn }
      >
        Compartilhar
      </button>
      {shareCopy && <p>Link copied!</p>}
      <img
        src={ iconHeart ? blackHearthIcon : whiteHearthIcon }
        alt="favorite food"
        role="presentation"
        data-testid="favorite-btn"
        onClick={ handleClickFavoriteRecipes }
      />

      <p data-testid="recipe-category">{ returnApiDrinks.strCategory }</p>
      <p data-testid="instructions">{returnApiDrinks.strInstructions}</p>

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

      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Finish Recipe
      </button>
    </div>

  );
}

export default RecipeInProgress;
