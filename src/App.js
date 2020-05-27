import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Bookshelf from './Bookshelf';
import SearchPage from './SearchPage';


function App() {
  return (
    <div className="App">
      <h1>MyReads</h1>
      <Route exact
        path="/"
        component={Bookshelf}
      />
      <Route
        path="/search"
        component={SearchPage}
      />
    </div>
  );
}

export default App;
