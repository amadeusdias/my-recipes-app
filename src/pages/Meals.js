import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
// import SearchBar from '../components/SearchBar';

function Meals({ match: { path } }) {
  return (
    <div>
      <Header />
      <Recipes path={ path } />
      {/* FALTA O FOOTER! */}
    </div>
  );
}

Meals.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }),
}.isRequired;

export default Meals;
