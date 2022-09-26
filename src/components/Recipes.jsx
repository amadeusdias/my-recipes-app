import React from 'react';
import PropTypes from 'prop-types';
import Cards from './Cards';

function Recipes({ path }) {
  return <Cards path={ path } />;
}

Recipes.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Recipes;
