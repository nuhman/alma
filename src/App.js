import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Movie from './components/Movie/Movie';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/:itemId" component={Movie} exact />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
