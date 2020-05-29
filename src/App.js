import React, {Component} from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import {update} from './BooksAPI';
import Bookshelf from './Bookshelf';
import SearchPage from './SearchPage';


class App extends Component {

  state = {
    bookshelf: [],
  }

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
   * @description Updates the state with the latest bookshelf
   * @param {array} books - list of book objects
   */
  hanldeBookshelfUpdate = (books) => {
    this.setState({
      bookshelf: books
    });
  }

  /**
   * @description Update a books current shelf on the database
   * @param {string} bookID - book id
   * @param {string} shelf - shelf slug
   */
  handleBookUpdate = (bookID, shelf) => {
    this.setState(prevState => ({
      bookshelf: prevState.bookshelf.filter(book => {
        if (shelf === "none") return false;
        if (book.id === bookID) book.shelf = shelf;
        return book;
      })
    }));
    update({id: bookID}, shelf);
  }

  render() {
    return (
      <div className="App">
        <h1>MyReads</h1>
        <Route exact
          path="/"
          render={() => (
            <Bookshelf
              shelves={this.shelves}
              booksOnShelves={this.state.bookshelf}
              onBookshelfUpdate={this.hanldeBookshelfUpdate}
              onBookUpdate={this.handleBookUpdate}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage
              shelves={this.shelves}
              booksOnShelves={this.state.bookshelf}
              onBookUpdate={this.handleBookUpdate}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
