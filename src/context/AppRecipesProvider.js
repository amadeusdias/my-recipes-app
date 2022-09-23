import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppRecipesContext from './AppRecipesContext';

function AppRecipesProvider({ children }) {
  const [userEmail, setUserEmail] = useState('');

  const context = {
    setUserEmail,
    userEmail,
  };

  return (
    <AppRecipesContext.Provider value={ context }>
      {children}
    </AppRecipesContext.Provider>
  );
}

AppRecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppRecipesProvider;
