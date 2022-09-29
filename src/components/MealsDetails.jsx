import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import YoutubeEmbed from './YoutubeEmbed';
import AppRecipesContext from '../context/AppRecipesContext';
import '../css/carousel.css';
import { ingredients } from '../tests/helpers/numbers';
import '../css/mealsDetails.css';
import share from '../images/share.svg';
import favorite from '../images/favorite2.svg';

const SIX = 6;
function MealsDetails({ match: { params: { id } } }) {
  const { mealsCards } = useContext(AppRecipesContext);
  const [findMeal, setFindMeal] = useState([]);
  const [returnApiMeals, setReturnApiMeals] = useState([]);
  const [returnAllDrinks, setReturnAllDrinks] = useState([]);
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

  useEffect(() => {
    const fetchSixDrinksRecommended = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const result = await response.json();
      setReturnAllDrinks(result.drinks);
    };

    fetchSixDrinksRecommended();
  }, []);

  // useEffect(() => {
  //   const doneRecipes = [{
  //     id: '52771',
  //     type: 'meal',
  //     nationality: 'Italian',
  //     category: 'Vegetarian',
  //     alcoholicOrNot: '',
  //     name: 'Spicy Arrabiata Penne',
  //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //     doneDate: '22/6/2020',
  //     tags: ['Pasta', 'Curry'],
  //   }];
  //   localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  // }, []);

  const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
  const recipesProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

  let startBtn = '';
  const NameBtn = !recipesProgress ? 'Start Recipe' : 'Continue Recipe';
  if (recipesDone) startBtn = recipesDone.some((item) => item.id === params.id);
  // if (recipesProgress) {

  // }

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
    <div className="container-meals-details">
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
      <div className="scroll">
        {returnAllDrinks.length > 0 && returnAllDrinks.map((drink, index) => (
          index < SIX && (
            <div
              className="scroll-child"
              key={ drink.idDrink }
              data-testid={ `${index}-recommendation-card` }
            >
              <p
                className="p-scroll"
                data-testid={ `${index}-recommendation-title` }
              >
                {drink.strDrink}
              </p>
              <img
                className="img-scroll"
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
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
