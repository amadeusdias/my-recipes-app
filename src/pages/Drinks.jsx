import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import '../css/drinks.css';

function Drinks({ match: { path } }) {
  return (
    <div className="container-drinks-page">
      <Header title="Drinks" />
      <Recipes path={ path } />
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }),
}.isRequired;

export default Drinks;
