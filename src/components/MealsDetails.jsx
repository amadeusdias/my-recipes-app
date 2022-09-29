import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import YoutubeEmbed from './YoutubeEmbed';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppRecipesContext from '../context/AppRecipesContext';
import '../css/carousel.css';
import '../css/mealsDetails.css';
import favorite from '../images/favorite2.svg';
import shareIcon from '../images/shareIcon.svg';
import share from '../images/share.svg';
import { ingredients } from '../tests/helpers/numbers';
import YoutubeEmbed from './YoutubeEmbed';

const SIX = 6;
function MealsDetails({ match: { params: { id } } }) {
  const { mealsCards } = useContext(AppRecipesContext);
  const [findMeal, setFindMeal] = useState([]);
  const [returnApiMeals, setReturnApiMeals] = useState([]);
  const [returnAllDrinks, setReturnAllDrinks] = useState([]);
  const [shareCopy, setShareCopy] = useState(false);
  const [favoriteRecipes, setFavoritesRecipes] = useState([{}]);
  const params = useParams();
  const history = useHistory();

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
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipes),
    );
  }, [favoriteRecipes]);

  const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
  const recipesProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

  let startBtn = '';
  const NameBtn = !recipesProgress ? 'Start Recipe' : 'Continue Recipe';
  if (recipesDone) startBtn = recipesDone.some((item) => item.id === params.id);

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
    setFavoritesRecipes({
      id: findMeal[0].idMeal,
      type: 'meals',
      nationatity: findMeal[0].strArea,
      category: findMeal[0].strCategory,
      alcoholicOrNot: 'not',
      name: findMeal[0].strMeal,
      image: findMeal[0].strMealThumb,
    });
  }

  const TRINTAEDOIS = 32;

  return (
    <div className="container-meals-details">
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleClickShareBtn }
      >
        <img
          src={ shareIcon }
          alt="comida"
        />
      </button>
      {shareCopy && <p>Link copied!</p>}
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleClickFavoriteRecipes }
      >
        Favoritos
      </button>
      {cleanEmpty(returnApiMeals).map((item, index) => (
        <div key={ index }>
          <img src={ share } alt="favorite" className="icon-share" />
          <img src={ favorite } alt="favorite" className="icon-favorite" />
          <div className="container-img-meals">
            <img
              className="img-meals-details"
              data-testid="recipe-photo"
              src={ item.strMealThumb }
              alt={ item.strMeal }
            />
          </div>
          <h3 data-testid="recipe-title" className="title-food">{item.strMeal}</h3>
          <p data-testid="recipe-category">
            {/* Category: */}
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
