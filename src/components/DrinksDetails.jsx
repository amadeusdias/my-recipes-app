import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import AppRecipesContext from '../context/AppRecipesContext';
import numbers from '../tests/helpers/numbers';

function DrinksDetails({ match: { params: { id } } }) {
  const { drinksCards } = useContext(AppRecipesContext);
  const [findDrinks, setFindDrinks] = useState([]);
  const [returnApiDrinks, setReturnApiDrinks] = useState('');
  const params = useParams();

  useEffect(() => {
    setFindDrinks(drinksCards.filter((drink) => drink.idDrink === id));
  }, [drinksCards]); // eslint-disable-line

  useEffect(() => {
    const fetchDrinksDetails = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`;
      const response = await fetch(url);
      const result = await response.json();
      setReturnApiDrinks(result.drinks[0]);
    };

    fetchDrinksDetails();
  }, []); // eslint-disable-line
  console.log(findDrinks);
  console.log(returnApiDrinks);

  const cleanEmpty = (obj) => {
    const clean = Object.fromEntries(Object.entries(obj)
      .filter(([, v]) => v != null || v !== '' || v !== ' '));
    return Array(clean);
  };

  return (
    <div>
      {cleanEmpty(returnApiDrinks).map((item, index) => (
        <div key={ index }>
          <h3 data-testid="recipe-title">
            {item.strDrink}

          </h3>
          <p data-testid="recipe-category">{item.strAlcoholic}</p>
          <p>{item.strInstructions}</p>
          <ul>
            {numbers.map((indexI) => returnApiDrinks[`strIngredient${indexI}`]?.length
            > 0 && (
              <li
                key={ returnApiDrinks[`strIngredient${indexI}`] }
                data-testid={ `${indexI - 1}-ingredient-name-and-measure` }
              >
                {returnApiDrinks[`strIngredient${indexI}`]}
                {returnApiDrinks[`strMeasure${indexI}`]}
              </li>
            ))}
          </ul>
          <p data-testid="instructions">
            Instructions:
            {item.strInstructions}
          </p>
          <img
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
            data-testid="recipe-photo"
          />
        </div>
      ))}
    </div>
  );
}

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default DrinksDetails;
