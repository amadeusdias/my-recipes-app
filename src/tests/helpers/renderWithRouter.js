// src/renderWithRouter.js
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import AppRecipesProvider from '../../context/AppRecipesProvider';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <AppRecipesProvider>
        <Router history={ history }>{component}</Router>
      </AppRecipesProvider>,
    ),
    history,
  });
};
export default renderWithRouter;
