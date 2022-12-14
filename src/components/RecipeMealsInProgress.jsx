import copy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import AppRecipesContext from '../context/AppRecipesContext';
import blackHearthIcon from '../images/blackHeartIcon.svg';
import share from '../images/share.svg';
import volta from '../images/volta.svg';
import whiteHearthIcon from '../images/whiteHeartIcon.svg';
import { VINTE } from '../tests/helpers/numbers';

function RecipeMealsInProgress() {
  const {
    favoriteRecipes,
    setFavoritesRecipes,
  } = useContext(AppRecipesContext);
  const history = useHistory();
  const params = useParams();
  const idParams = params.id;
  const [returnApiMeals, setReturnApiMeals] = useState([]);
  const [shareCopy, setShareCopy] = useState(false);
  const [iconHeart, setIconHeart] = useState(false);
  const [test1, setTes1] = useState([]);
  const [test2, setTest2] = useState('');
  const [checked, setChecked] = useState('');
  const [validateFinish, setValidateFinish] = useState([]);

  // const validateFinish = [];
  // const [ingredientsChecked, setIngredientsChecked] = useState(() => {
  //   const local = localStorage.getItem('inProgressRecipes');
  //   return local || { meals: {
  //     [idParams]: [],
  //   } };
  // });
  const ingredients = [];

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
    const favoriteFoods = JSON.parse(localStorage.getItem(('favoriteRecipes'))) || [];
    const isFavorite = favoriteFoods.some((f) => f.id === params.id);
    setIconHeart(isFavorite);
  }, [favoriteRecipes]);// eslint-disable-line

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
  }, [returnApiMeals]);// eslint-disable-line

  for (let index = 0; index <= VINTE; index += 1) {
    if (returnApiMeals && returnApiMeals[`strIngredient${index}`]) {
      ingredients.push(returnApiMeals[`strIngredient${index}`]);
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
    } // l??gica para retirar item do localStorage;
    setIconHeart(!iconHeart);
  }

  function handleClickShareBtn() {
    const inProgress = window.location.pathname.indexOf('/in-progress');
    const link = window.location.pathname.slice(0, inProgress);
    copy(`http://localhost:3000${link}`);
    setShareCopy(!shareCopy);
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      const aa = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setTes1(aa.meals[idParams]);
      setChecked(aa.meals[idParams]);
    }
  }, [test2]);// eslint-disable-line

  // useEffect(() => {
  //   localStorage.setItem('inProgressRecipes', JSON.stringify({
  //     meals: {
  //       [idParams]: [...test1],
  //     },
  //   }));
  // }, [test1]);

  useEffect(() => {
    localStorage.getItem('inProgressRecipes');
  }, []);

  function handleChange({ target: { name } }) {
    setValidateFinish([...validateFinish, name]);
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

    // setTes1(filtro);
  }

  // function handleChangeChecked() {
  //   checked.some((item) => item);
  // }
  function handleClickFinishRecipe() {
    localStorage.setItem('doneRecipes', JSON.stringify([{
      // ...JSON.parse(localStorage.getItem('doneRecipes')),
      id: returnApiMeals.idMeal,
      type: 'meal',
      nationality: returnApiMeals.strArea,
      category: returnApiMeals.strCategory,
      alcoholicOrNot: '',
      name: returnApiMeals.strMeal,
      image: returnApiMeals.strMealThumb,
      doneDate: new Date((Date.now())).toDateString(),
      tags: [],
    }]));
    history.push('/done-recipes');
  }
  console.log(validateFinish);
  console.log(validateFinish.length === ingredients.length);

  return (
    <div className="container-meals-details">
      <Link to={ `/meals/${params.id}` }>
        <img
          className="volta"
          src={ volta }
          alt="return"
        />
      </Link>
      <div>
        <button
          type="button"
          className="icon-share"
          data-testid="share-btn"
          onClick={ handleClickShareBtn }
        >
          <img src={ share } alt="favorite" />
        </button>
        {shareCopy && <p>Link copied!</p>}
        <img
          className="icon-favorite"
          src={ iconHeart ? blackHearthIcon : whiteHearthIcon }
          alt="favorite food"
          role="presentation"
          data-testid="favorite-btn"
          onClick={ handleClickFavoriteRecipes }
        />
        <div className="container-img-meals">
          <img
            className="img-meals-details"
            data-testid="recipe-photo"
            src={ returnApiMeals.strMealThumb }
            alt={ returnApiMeals.strArea }
          />
        </div>
        <h3 data-testid="recipe-title" className="title-food">
          {returnApiMeals.strArea}
        </h3>
        <p data-testid="recipe-category">{ returnApiMeals.strCategory }</p>

        {ingredients.map((element, index) => (
          <div key={ element }>
            <label
              htmlFor={ element }
              className={ checked && checked.includes(element) && 'test' }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                name={ element }
                id={ element }
                type="checkbox"
                onClick={ handleChange }
                checked={ checked && checked.some((item) => item === element) }
                // onChange={ handleChangeChecked }
              />
              {element}
            </label>
          </div>
        ))}
        <h2 className="title-meals-details">Instructions:</h2>
        <p
          data-testid="instructions"
          className="instructions"
        >
          {returnApiMeals.strInstructions}
        </p>
      </div>

      <button
        className="scroll-btn"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ validateFinish.length !== ingredients.length }
        onClick={ handleClickFinishRecipe }
      >
        Finish Recipe

      </button>
    </div>

  );
}

export default RecipeMealsInProgress;
