import React, {Component} from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import {update} from './BooksAPI';
import Bookshelf from './Bookshelf';
import SearchPage from './SearchPage';


class App extends Component {

  // List of available book shelves
  shelves = [
    {
      name: "Currently Reading",
      slug: "currentlyReading"
    },
    {
      name: "Want To Read",
      slug: "wantToRead"
    },
    {
      name: "Read",
      slug: "read"
    },
    {
      name: "None",
      slug: "none"
    }
  ]

  /**
   * @description Update a books current shelf on the database
   * @param {string} bookID - book id
   * @param {string} shelf - shelf slug
   */
  handleBookUpdate = (bookID, shelf) => {
    update({id: bookID}, shelf);
  }

  render() {
    return (
      <div className="App">
        <h1>MyReads</h1>
        <Route exact
          path="/"
          render={() => (
            <Bookshelf shelves={this.shelves} onBookUpdate={this.handleBookUpdate} />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage shelves={this.shelves} onBookUpdate={this.handleBookUpdate} />
          )}
        />
      </div>
    );
  }
}

export default App;
