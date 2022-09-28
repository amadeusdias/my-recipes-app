import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import '../css/meals.css';
import Footer from '../components/Footer';

function Meals({ match: { path } }) {
  return (
    <div className="container-meals-page">
      <Header title="Meals" />
      <Recipes path={ path } />
      <Footer />
    </div>
  );
}

Meals.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }),
}.isRequired;

export default Meals;
