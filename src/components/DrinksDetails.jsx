import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import whiteHearthIcon from '../images/whiteHeartIcon.svg';
import blackHearthIcon from '../images/blackHeartIcon.svg';
import AppRecipesContext from '../context/AppRecipesContext';
import { ingredients, SIX } from '../tests/helpers/numbers';
import shareIcon from '../images/shareIcon.svg';

function DrinksDetails({ match: { params: { id } } }) {
  const { drinksCards,
    favoriteRecipes,
    setFavoritesRecipes,
  } = useContext(AppRecipesContext);
  const params = useParams();
  const history = useHistory();
  const [findDrinks, setFindDrinks] = useState([]);
  const [returnApiDrinks, setReturnApiDrinks] = useState('');
  const [returnAllMeals, setReturnAllMeals] = useState([]);
  const [shareCopy, setShareCopy] = useState(false);
  const [iconHeart, setIconHeart] = useState(false);

  useEffect(() => {
    setFindDrinks(drinksCards.filter((drink) => drink.idDrink === id));
  }, [drinksCards]); // eslint-disable-line

  useEffect(() => {
    const fetchDrinksDetails = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`;
      const response = await fetch(url);
      const result = await response.json();
      setReturnApiDrinks(result.drinks[0]);
    };
    fetchDrinksDetails();
  }, []); // eslint-disable-line

  useEffect(() => {
    const fetchSixMealsRecommended = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const result = await response.json();
      setReturnAllMeals(result.meals);
    };

    fetchSixMealsRecommended();
  }, []);

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
  }, [returnApiDrinks]); // eslint-disable-line

  useEffect(() => {
    const favoriteDrinks = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFavorite = favoriteDrinks.some((drink) => drink.id === params.id);
    setIconHeart(isFavorite);
  }, [favoriteRecipes, params.id]);

  const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
  const recipesProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

  let startBtn = '';
  const NameBtn = !recipesProgress ? 'Start Recipe' : 'Continue Recipe';
  if (recipesDone) startBtn = recipesDone.some((item) => item.id === params.id);

  const cleanEmpty = (obj) => {
    const clean = Object.fromEntries(Object.entries(obj)
      .filter(([, v]) => v != null || v !== '' || v !== ' '));
    return Array(clean);
  };

  function handleClickToInProgress() {
    history.push(`/drinks/${params.id}/in-progress`);
  }

  function handleClickShareBtn() {
    if (findDrinks) {
      copy(`http://localhost:3000${window.location.pathname}`);
      setShareCopy(!shareCopy);
      console.log('aaaaa');
    }
  }

  function handleClickFavoriteRecipes() {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipes),
    );
    const toggleHeart = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (toggleHeart.find((local) => local.id !== params.id)) {
      localStorage.removeItem('favoriteRecipes');
    }
    setIconHeart(!iconHeart);
  }

  return (
    <div>
      <img
        src={ shareIcon }
        alt="bebida"
        role="presentation"
        data-testid="share-btn"
        onClick={ handleClickShareBtn }
      />
      {shareCopy && <p>Link copied!</p>}
      <img
        className="favorite"
        src={ iconHeart ? blackHearthIcon : whiteHearthIcon }
        alt="favorite drink"
        role="presentation"
        data-testid="favorite-btn"
        onClick={ handleClickFavoriteRecipes }
      />
      {cleanEmpty(returnApiDrinks).map((item, index) => (
        <div key={ index }>
          <h3 data-testid="recipe-title">
            {item.strDrink}
          </h3>
          <p data-testid="recipe-category">{item.strAlcoholic}</p>
          <p>{item.strInstructions}</p>
          <ul>
            {ingredients.map((indexI) => returnApiDrinks[`strIngredient${indexI}`]?.length
            > 0 && (
              <li
                key={ returnApiDrinks[`strIngredient${indexI}`] }
                data-testid={ `${indexI - 1}-ingredient-name-and-measure` }
              >
                {returnApiDrinks[`strIngredient${indexI}`]}
                {returnApiDrinks[`strMeasure${indexI}`]}
              </li>
            ))}
          </ul>
          <p data-testid="instructions">
            Instructions:
            {item.strInstructions}
          </p>
          <img
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
            data-testid="recipe-photo"
          />
        </div>
      ))}
      <div className="scroll">
        {returnAllMeals.length > 0 && returnAllMeals.map((meal, index) => (
          index < SIX && (
            <div
              className="scroll-child"
              key={ meal.idMeal }
              data-testid={ `${index}-recommendation-card` }
            >
              <p
                className="p-scroll"
                data-testid={ `${index}-recommendation-title` }
              >
                {meal.strMeal}
              </p>
              <img
                className="img-scroll"
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
            </div>
          )
        ))}
      </div>
      {!startBtn && (
        <button
          className="scroll-btn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleClickToInProgress }
        >
          {NameBtn}
        </button>
      )}
    </div>
  );
}

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default DrinksDetails;
