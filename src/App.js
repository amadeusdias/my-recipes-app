import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import AppRecipesProvider from './context/AppRecipesProvider';

function App() {
  return (
    <AppRecipesProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/meals" component={ Meals } />
          <Route path="/drinks" component={ Drinks } />
          <Route path="/meals/:id" />
          <Route path="/drinks/:id" />
          <Route path="/drinks/:id/in-progress" />
          <Route path="/meals/:id/in-progress" />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </AppRecipesProvider>
  );
}

export default App;
