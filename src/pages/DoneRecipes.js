import copy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import '../css/doneRecipes.css';
// import doneAllIcon from '../images/doneAllIcon.svg';
// import doneDrinkIcon from '../images/doneDrinkIcon.svg';
// import doneFoodIcon from '../images/doneFoodIcon.svg';
// import footerimg from '../images/footer.svg';
import shareIcon from '../images/shareIcon.svg';

// const hor = 'horizontal-tag'; // const criada para contornar problema de caracteres maximos

function DoneRecipes() {
  const history = useHistory();
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [shareCopy, setShareCopy] = useState('');

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
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
    console.log(name);
    setFilteredRecipes(doneRecipes.filter((recipe) => recipe.type.includes(name)));
  }

  function saveClip(type, item) {
    copy(`http://localhost:3000/${type}/${item}`);
  }

  function pushToFoodDetails(type, id) {
    if (type === 'meal') {
      return history.push(`/meals/${id}`);
    }
    return history.push(`/drinks/${id}`);
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
          <p data-testid={ `${index}-horizontal-done-date` }>{ item.doneDate }</p>
          { !item.tags[0] ? null
            : (
              <p data-testid={ `${index}-${item.tags[0]}-horizontal-tag` }>
                { item.tags[0] }
              </p>)}
          { !item.tags[1] ? null
            : (
              <p data-testid={ `${index}-${item.tags[1]}-horizontal-tag` }>
                { item.tags[1] }
              </p>)}
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
          />
          { shareCopy === index && <p>Link copied!</p> }
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
