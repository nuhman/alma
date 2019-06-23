import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Movie from './components/Movie/Movie';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/:itemId" component={Movie} exact />
          <Route path="/profile/:itemId" component={Profile} exact />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
