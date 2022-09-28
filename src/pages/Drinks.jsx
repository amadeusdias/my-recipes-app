import React from 'react';
import PropTypes from 'prop-types';
import Recipes from '../components/Recipes';
import Header from '../components/Header';

function Drinks({ match: { path } }) {
  return (
    <div>
      <Header title="Drinks" />
      <Recipes path={ path } />
      {/* FALTA O FOOTER AQUI!! */}
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }),
}.isRequired;

export default Drinks;
