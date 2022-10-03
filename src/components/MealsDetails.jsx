import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import AppRecipesContext from '../context/AppRecipesContext';
import '../css/carousel.css';
import '../css/mealsDetails.css';
import blackHearthIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import volta from '../images/volta.svg';
import whiteHearthIcon from '../images/whiteHeartIcon.svg';
import YoutubeEmbed from './YoutubeEmbed';
// import share from '../images/share.svg';
import { ingredients, SIX, TRINTAEDOIS } from '../tests/helpers/numbers';

function MealsDetails({ match: { params: { id } } }) {
  const {
    mealsCards,
    favoriteRecipes,
    setFavoritesRecipes,
  } = useContext(AppRecipesContext);
  const params = useParams();
  const history = useHistory();
  const [findMeal, setFindMeal] = useState([]);
  const [returnApiMeals, setReturnApiMeals] = useState([]);
  const [returnAllDrinks, setReturnAllDrinks] = useState([]);
  const [shareCopy, setShareCopy] = useState(false);
  const [iconHeart, setIconHeart] = useState(false);

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

  useEffect(() => {
    const fetchSixDrinksRecommended = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const result = await response.json();
      setReturnAllDrinks(result.drinks);
    };

    fetchSixDrinksRecommended();
  }, []);

  useEffect(() => {
    setFavoritesRecipes('');
    setFavoritesRecipes([
      ...favoriteRecipes,
      {
        id: returnApiMeals.idMeal,
        type: 'meal',
        nationality: returnApiMeals.strArea,
        category: returnApiMeals.strCategory,
        alcoholicOrNot: '',
        name: returnApiMeals.strMeal,
        image: returnApiMeals.strMealThumb,
      }].filter((item) => item.id));
  }, [returnApiMeals]); // eslint-disable-line

  useEffect(() => {
    const favoriteFoods = JSON.parse(localStorage.getItem(('favoriteRecipes'))) || [];
    const isFavorite = favoriteFoods.some((f) => f.id === params.id);
    setIconHeart(isFavorite);
  }, [favoriteRecipes]); // eslint-disable-line

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
    history.push(`/meals/${params.id}/in-progress`);
  }

  function handleClickShareBtn() {
    if (findMeal) {
      copy(`http://localhost:3000${window.location.pathname}`);
      setShareCopy(!shareCopy);
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

  return (
    <div className="container-meals-details">
      <Link to="/meals">
        <img
          className="volta"
          src={ volta }
          alt="return"
        />
      </Link>
      <img
        className="icon-share"
        src={ shareIcon }
        alt="comida"
        role="presentation"
        data-testid="share-btn"
        onClick={ handleClickShareBtn }
      />
      <img
        className="icon-favorite"
        src={ iconHeart ? blackHearthIcon : whiteHearthIcon }
        alt="favorite food"
        role="presentation"
        data-testid="favorite-btn"
        onClick={ handleClickFavoriteRecipes }
      />
      {cleanEmpty(returnApiMeals).map((item, index) => (
        <div key={ index }>
          {/* <img src={ share } alt="favorite" className="icon-share" /> */}
          {/* <img src={ favorite } alt="favorite" className="icon-favorite" /> */}
          <div className="container-img-meals">
            <img
              className="img-meals-details"
              data-testid="recipe-photo"
              src={ item.strMealThumb }
              alt={ item.strMeal }
            />
          </div>
          {shareCopy && <p className="copied">Link copied!</p>}
          <h3 data-testid="recipe-title" className="title-food">{item.strMeal}</h3>
          <p data-testid="recipe-category">
            {item.strCategory}
          </p>
          <h2 className="title-meals-details">Ingredients</h2>
          <ul className="list-ingredients">
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
          <h2 className="title-meals-details">Instructions:</h2>
          <p data-testid="instructions" className="instructions">
            {item.strInstructions}
          </p>
          <div className="youtube-video">
            <h2 className="title-meals-details">Video:</h2>
            <YoutubeEmbed
              data-testid="video"
              embedId={ item.strYoutube
                ? item.strYoutube.slice(TRINTAEDOIS) : null }
            />
          </div>
        </div>
      ))}
      <h2 className="title-meals-details">Recommended</h2>
      <div className="scroll">
        {returnAllDrinks.length > 0 && returnAllDrinks.map((drink, index) => (
          index < SIX && (
            <div
              className="scroll-child"
              key={ drink.idDrink }
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                className="img-scroll"
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <p
                className="p-scroll"
                data-testid={ `${index}-recommendation-title` }
              >
                {drink.strDrink}
              </p>
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

MealsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default MealsDetails;
