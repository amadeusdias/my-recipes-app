import copy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import '../css/doneRecipes.css';
import shareIcon from '../images/shareIcon.svg';
import black from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const history = useHistory();
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [shareCopy, setShareCopy] = useState('');

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getLocalStorage === null) {
      setDoneRecipes([]);
      setFilteredRecipes([]);
      return null;
    }
    setDoneRecipes(getLocalStorage);
    setFilteredRecipes(getLocalStorage);
  }, []);

  function toRender({ target }) {
    const { name } = target;
    setFilteredRecipes(doneRecipes.filter((recipe) => recipe.type.includes(name)));
  }

  function saveClip(type, item) {
    copy(`http://localhost:3000/${type}/${item}`);
  }

  function pushToFoodDetails(type, id) {
    if (type === 'meal') {
      history.push(`/meals/${id}`);
      return null;
    }
    return history.push(`/drinks/${id}`);
  }

  function desfavorite(idItem) {
    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const storageFiltered = getLocalStorage.filter((recipe) => recipe.id !== idItem);
    localStorage.setItem('favoriteRecipes', JSON.stringify(storageFiltered));
    setDoneRecipes(storageFiltered);
    setFilteredRecipes(storageFiltered);
  }

  return (
    <div className="container-donerecipes">
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        name=""
        onClick={ toRender }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        name="meal"
        onClick={ toRender }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="drink"
        onClick={ toRender }
      >
        Drinks
      </button>
      { filteredRecipes.map((item, index) => (
        <div key={ index }>
          <img
            className="img-fdp"
            onClick={ () => pushToFoodDetails(item.type, item.id) }
            role="presentation"
            data-testid={ `${index}-horizontal-image` }
            alt={ item.name }
            src={ item.image }
          />
          <p
            role="presentation"
            onClick={ () => pushToFoodDetails(item.type, item.id) }
            data-testid={ `${index}-horizontal-name` }
          >
            { item.name }
          </p>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { item.nationality
              ? `${item.nationality} - ${item.category} ${item.alcoholicOrNot}`
              : `${item.category} ${item.alcoholicOrNot}`}
          </p>
          { item.alcoholicOrNot ? <p>{item.alcoholicOrNot}</p> : null }
          <button
            type="button"
            src={ shareIcon }
            alt="share-icon"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ (() => {
              setShareCopy(index);
              return item.type.includes('meal') ? saveClip('meals', item.id)
                : saveClip('drinks', item.id);
            }) }
          >
            Share
          </button>
          { shareCopy === index && <p>Link copied!</p> }
          <button
            type="button"
            onClick={ () => desfavorite(item.id) }
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ black }
          >
            Desfavor
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
