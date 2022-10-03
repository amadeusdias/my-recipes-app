import copy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppRecipesContext from '../context/AppRecipesContext';
import '../css/doneRecipes.css';
import blackHearthIcon from '../images/blackHeartIcon.svg';
import whiteHearthIcon from '../images/whiteHeartIcon.svg';
import { VINTE } from '../tests/helpers/numbers';

function RecipeInProgress() {
  const {
    favoriteRecipes,
    setFavoritesRecipes,
  } = useContext(AppRecipesContext);
  const history = useHistory();
  const params = useParams();
  const idParams = params.id;
  const [returnApiDrinks, setReturnApiDrinks] = useState('');
  const [shareCopy, setShareCopy] = useState(false);
  const [iconHeart, setIconHeart] = useState(false);
  const [test1, setTes1] = useState([]);
  const [test2, setTest2] = useState('');
  const [checked, setChecked] = useState('');
  const [validateFinish, setValidateFinish] = useState(0);
  const ingredients = [];
  // const validateFinish = [];

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
  }, [returnApiDrinks]); // eslint-disable-line

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      const aa = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setTes1(aa.meals[idParams]);
      setChecked(aa.meals[idParams]);
    }
  }, [test2]);// eslint-disable-line

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

  function handleChange({ target: { name } }) {
    setValidateFinish(validateFinish + 1);
    // const test = ingredientsChecked.meals.idParams;
    // console.log(ingredientsChecked);
    // console.log(test);
    // const local = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    // console.log(local && local.meals[idParams]);
    const filtro = test1.filter((item) => item !== name);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {
        [idParams]: [...filtro, name],
      },
    }));
    setTest2(filtro);
    console.log(filtro);
    console.log(validateFinish);
    // setTes1(filtro);
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

      {ingredients.map((element, index) => (
        <label
          key={ element }
          htmlFor={ element }
          data-testid={ `${index}-ingredient-step` }
        >
          {element}
          <input
            name={ element }
            id={ element }
            type="checkbox"
            onClick={ handleChange }
            checked={ checked && checked.some((item) => item === element) }
          />
        </label>
      ))}

      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ validateFinish !== ingredients.length }
        onClick={ () => history.push('/done-recipes') }
      >
        Finish Recipe
      </button>
    </div>

  );
}

export default RecipeInProgress;
