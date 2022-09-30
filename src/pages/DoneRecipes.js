import React, { useState } from 'react';
import Header from '../components/Header';
import '../css/doneRecipes.css';
import doneAllIcon from '../images/doneAllIcon.svg';
import doneDrinkIcon from '../images/doneDrinkIcon.svg';
import doneFoodIcon from '../images/doneFoodIcon.svg';
import footerimg from '../images/footer.svg';
import shareIcon from '../images/shareIcon.svg';

const allMocks = [
  {
    id: 11064,
    type: 'Drinks',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Alcoholic',
    name: 'Banana Daiquiri',
    image: 'https://www.thecocktaildb.com/images/media/drink/k1xatq1504389300.jpg',
    doneDate: '29/09/2022',
    tags: ['Fruity'],
  },
  {
    id: 53013,
    type: 'Meals',
    nationality: 'American',
    category: 'Beef',
    alcoholicOrNot: '',
    name: 'Big Mac',
    image: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
    doneDate: '29/09/2022',
    tags: [''],
  },
];
const hor = 'horizontal-tag'; // const criada para contornar problema de caracteres maximos em uma linha

function DoneRecipes() {
  const [render, setRender] = useState(allMocks);
  const [shareCopy, setShareCopy] = useState('');

  function toRender({ target }) {
    const { name } = target;
    setRender(allMocks.filter((recipe) => recipe.type.includes(name)));
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
          name="Meals"
          onClick={ toRender }
        >
          <img src={ doneFoodIcon } alt={ doneFoodIcon } />
        </button>
        <button
          className="btn-donerecipes"
          type="button"
          data-testid="filter-by-drink-btn"
          name="Drinks"
          onClick={ toRender }
        >
          <img src={ doneDrinkIcon } alt={ doneDrinkIcon } />
        </button>
      </div>

      {/* //! AQUI DEVE ENTRAR UM MAP DESCENTE COM O QUE VIRÁ DA TELA DE PROGRESSO! */}
      <div className="container-cards-donerecipes">
        {render.map((item, index) => (
          <div className="card-donerecipes" key={ index }>
            <img
              className="img-donerecipes"
              data-testid={ `${item}-horizontal-image` }
              alt="imagem"
              src={ item.image }
            />
            <div className="container-donerecipes-info">
              <p className="title-dr" data-testid={ `${index}-${hor}` }>{ item.name }</p>
              <div className="pirocoptero">
                { item.type === 'Meals' ? <p>{item.nationality}</p>
                  : <p>{item.alcoholicOrNot}</p> }
                <p data-testid={ `${index}-horizontal-top-text` }>{ item.category }</p>
              </div>
              <p className="date-dr" data-testid={ `${index}-${hor}` }>
                {`Done in: ${item.doneDate}` }
              </p>
              <div className="tags">
                { !item.tags[0] ? null
                  : (
                    <p className="tag" data-testid={ `${index}-${item.tags}-${hor}` }>
                      { item.tags[0] }
                    </p>)}
                { !item.tags[1] ? null
                  : (
                    <p className="tag" data-testid={ `${index}-${item.tags}-${hor}` }>
                      { item.tags[1] }
                    </p>)}
              </div>
              <button
                className="btn-shareIcon"
                type="button"
                data-testid={ `${item}-horizontal-share-btn` }
                onClick={ (() => {
                  setShareCopy(index);
                  return item.type.includes('Meals') ? saveClip('meals', item.id)
                    : saveClip('drinks', item.id);
                }) }
              >
                <img src={ shareIcon } alt="shareIcon" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <img src={ footerimg } alt="footer de mentirinha" />
    </div>
  );
}

export default DoneRecipes;
