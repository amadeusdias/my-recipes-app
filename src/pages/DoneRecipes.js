import copy from 'clipboard-copy';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const allMocks = [
  {
    id: 11064,
    type: 'drinks',
    nationality: '',
    category: 'ordinary Drink',
    alcoholicOrNot: 'alcoholic',
    name: 'banana Daiquiri',
    image: 'https://www.thecocktaildb.com/images/media/drink/k1xatq1504389300.jpg',
    doneDate: '29/09/2022',
    tags: ['fruity'],
  },
  {
    id: 53013,
    type: 'meals',
    nationality: 'american',
    category: 'beef',
    alcoholicOrNot: '',
    name: 'Big Mac',
    image: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
    doneDate: '29/09/2022',
    tags: [''],
  },
];

function DoneRecipes() {
  const [render, setRender] = useState(allMocks);
  // const [render, setRender] = useState([]); PEGAR DO LOCALSTORAGE
  const [shareCopy, setShareCopy] = useState('');

  const history = useHistory();

  function toRender({ target }) {
    const { name } = target;
    // const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes')); PEGAR DO LOCALSTORAGE
    setRender(allMocks.filter((recipe) => recipe.type.includes(name)));
    // setRender(getLocalStorage.filter((recipe) => recipe.type.includes(name))); PEGAR DO LOCALSTORAGE
  }

  function saveClip(type, item) {
    copy(`http://localhost:3000/${type}/${item}`);
  }

  function pushToFoodDetails(type, id) {
    if (type === 'meals') {
      return history.push(`/meals/${id}`);
    }
    return history.push(`/drinks/${id}`);
  }

  return (
    <div>
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
        name="meals"
        onClick={ toRender }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="drinks"
        onClick={ toRender }
      >
        Drinks
      </button>
      { render.map((item, index) => (
        <div key={ index }>
          <button
            type="button"
            onClick={ () => pushToFoodDetails(item.type, item.id) }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              alt="imagem"
              src={ item.image }
            />
          </button>
          <button type="button" onClick={ () => pushToFoodDetails(item.type, item.id) }>
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              { item.name }
            </p>
          </button>
          <p data-testid={ `${index}-horizontal-top-text` }>{ item.category }</p>
          { item.type === 'meals' ? <p>{item.nationality}</p>
            : <p>{item.alcoholicOrNot}</p> }
          <p data-testid={ `${index}-horizontal-done-date` }>{ item.doneDate }</p>
          { !item.tags[0] ? null
            : (
              <p data-testid={ `${index}-${item.tags}-horizontal-tag` }>
                { item.tags[0] }
              </p>)}
          { !item.tags[0] ? null
            : (
              <p data-testid={ `${index}-${item.tags}-horizontal-tag` }>
                { item.tags[1] }
              </p>)}
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ (() => {
              setShareCopy(index);
              return item.type.includes('Meals') ? saveClip('meals', item.id)
                : saveClip('drinks', item.id);
            }) }
          >
            <img src={ shareIcon } alt="share-icon" />
          </button>
          { shareCopy === index && <p>Link copied!</p> }
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
