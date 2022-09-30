import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DrinksDetails from './components/DrinksDetails';
import MealsDetails from './components/MealsDetails';
import RecipeInProgress from './components/RecipeInProgress';
import AppRecipesProvider from './context/AppRecipesProvider';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Profile from './pages/Profile';

function App() {
  return (
    <AppRecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/meals/:id" component={ MealsDetails } />
        <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:id" component={ DrinksDetails } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </AppRecipesProvider>
  );
}

export default App;
