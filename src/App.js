import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import AppRecipesProvider from './context/AppRecipesProvider';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE 2.0</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <AppRecipesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
          </Switch>
        </BrowserRouter>
      </AppRecipesProvider>
    </div>
  );
}

export default App;
