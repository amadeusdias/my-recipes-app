import copy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import '../css/doneRecipes.css';
import doneAllIcon from '../images/doneAllIcon.svg';
import doneDrinkIcon from '../images/doneDrinkIcon.svg';
import doneFoodIcon from '../images/doneFoodIcon.svg';
import footerimg from '../images/footer.svg';
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
      <div className="menu-btn-donerecipes">
        <button
          className="btn-donerecipes"
          type="button"
          data-testid="filter-by-all-btn"
          name=""
          onClick={ toRender }
        >
          <img src={ doneAllIcon } alt={ doneAllIcon } />
        </button>
        <button
          className="btn-donerecipes"
          type="button"
          data-testid="filter-by-meal-btn"
          name="meal"
          onClick={ toRender }
        >
          <img src={ doneFoodIcon } alt={ doneFoodIcon } />
        </button>
        <button
          className="btn-donerecipes"
          type="button"
          data-testid="filter-by-drink-btn"
          name="drink"
          onClick={ toRender }
        >
          <img src={ doneDrinkIcon } alt={ doneDrinkIcon } />
        </button>
      </div>
      <div className="container-cards-donerecipes">
        { filteredRecipes.map((item, index) => (
          <div className="card-donerecipes" key={ index }>
            <img
              className="img-donerecipes"
              onClick={ () => pushToFoodDetails(item.type, item.id) }
              role="presentation"
              data-testid={ `${index}-horizontal-image` }
              alt={ item.name }
              src={ item.image }
            />
            <div className="container-donerecipes-info">
              <p
                className="title-dr"
                role="presentation"
                onClick={ () => pushToFoodDetails(item.type, item.id) }
                data-testid={ `${index}-horizontal-name` }
              >
                { item.name }
              </p>
              <div className="pirocoptero">
                { item.alcoholicOrNot ? <p>{item.alcoholicOrNot}</p> : null }
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { item.nationality
                    ? `${item.nationality} - ${item.category} ${item.alcoholicOrNot}`
                    : `${item.category} ${item.alcoholicOrNot}`}
                </p>
              </div>
              <p
                className="date-dr"
                data-testid={ `${index}-horizontal-done-date` }
              >
                { item.doneDate }
              </p>
              <div className="tags">
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
              </div>
              <button
                className="btn-shareIcon"
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
          </div>
        ))}
      </div>
      <img className="fake-footer" src={ footerimg } alt="footer de mentirinha" />
    </div>
  );
}

export default DoneRecipes;
