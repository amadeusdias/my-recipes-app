import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import AppRecipesContext from '../context/AppRecipesContext';
// import { fetchAPI } from '../service/fetchCards';

function DrinksDetails({ match: { params: { id } } }) {
  const { drinksCards } = useContext(AppRecipesContext);
  const [findDrinks, setFindDrinks] = useState([]);
  const [returnApiDrinks, setReturnApiDrinks] = useState('');
  const params = useParams();
  // console.log(params);

  useEffect(() => {
    setFindDrinks(drinksCards.filter((drink) => drink.idDrink === id));
  }, [drinksCards]); // eslint-disable-line

  useEffect(() => {
    const fetchDrinksDetails = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`;
      const response = await fetch(url);
      const result = await response.json();
      console.log(result.drinks);
      setReturnApiDrinks(result.drinks[0]);
    };

    fetchDrinksDetails();
  }, []); // eslint-disable-line

  console.log(returnApiDrinks);

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
