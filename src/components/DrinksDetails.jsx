import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppRecipesContext from '../context/AppRecipesContext';

function DrinksDetails({ match: { params: { id } } }) {
  const { drinksCards } = useContext(AppRecipesContext);
  const [findDrinks, setFindDrinks] = useState([]);

  useEffect(() => {
    setFindDrinks(drinksCards.filter((drink) => drink.idDrink === id));
  }, [drinksCards]); //eslint-disable-line

  return (
    <div>
      {findDrinks.map((item, index) => (
        <div key={ index }>
          <p>{item.strInstructions}</p>
          <img src={ item.strDrinkThumb } alt={ item.strDrink } />
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
