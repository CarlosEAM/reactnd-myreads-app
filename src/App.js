import React, {Component} from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import {getAll, update} from './BooksAPI';
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

  componentDidMount() {
    // in case app reloads in search page we need a list of current bookshelf
    this.getBookshelf();
  }

  // Request all the books with a shelf assigned to them
  getBookshelf = () => {
    getAll().then(books => {
      this.setState(prevState => ({
        bookshelf: books,
      }));
    })
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
        <main className="app-content">
          <Route exact
            path="/"
            render={() => (
              <Bookshelf
                shelves={this.shelves}
                booksOnShelves={this.state.bookshelf}
                getBookshelf={this.getBookshelf}
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
        </main>
        <footer className="app-footer">
          <p>Created by Carlos EAM 2020</p>
          <p>Udacity Project</p>
          <p>
            <a href="http://jigsaw.w3.org/css-validator/check/referer">
                <img style={{border:0,width:'88px',height:'31px'}}
                  src="http://jigsaw.w3.org/css-validator/images/vcss-blue"
                  alt="Valid CSS!"
                />
                </a>
            </p>
        </footer>
      </div>
    );
  }
}

export default App;
