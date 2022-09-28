import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import MealsDetails from './components/MealsDetails';
import Drinks from './pages/Drinks';
import DrinksDetails from './components/DrinksDetails';
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
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route path="/meals/:id" component={ MealsDetails } />
          <Route path="/drinks/:id" component={ DrinksDetails } />
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
