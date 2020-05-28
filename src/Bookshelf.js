import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getAll} from './BooksAPI';
import Shelf from './Shelf';


/**
 * @description Creates a Bookshelf
 * @param {object} props.bookList - list of books
 * @param {array} props.shelves - list of available book shelves
 * @param {function} props.onBookUpdate - function to update a books shelf
 */
class Bookshelf extends Component {
  state = {
    booksOnShelves: [],
  }

  componentDidMount() {
    getAll().then(books => this.setState({
      booksOnShelves: books
    }));
  }

  /**
   * @description Takes update request and updates the current books state
   * @param {string} bookID - book id
   * @param {string} shelf - shelf slug
   */
  handleUpdateRequest = (bookID, shelf) => {
    this.setState(prevState => ({
      booksOnShelves: prevState.booksOnShelves.filter(book => {
        if (shelf === "none") return false;
        if (book.id === bookID) book.shelf = shelf;
        return book;
      })
    }));
    // Update the database
    this.props.onBookUpdate(bookID, shelf);
  }

  render() {    
    return (
      <section className="bookshelf">
        <Link
          to="/search"
          className="nav-search-btn"
        >Search</Link>
        <h2>BUILDING BOOKSHELF...</h2>
        {this.props.shelves.map(({name, slug}) => {
          return (slug !== "none") 
            ? <Shelf
                key={slug}
                name={name}
                slug={slug}
                books={this.state.booksOnShelves}
                shelves={this.props.shelves}
                onBookUpdate={this.handleUpdateRequest}
              />
            : false
        })}
      </section>
    );
  }
}

export default Bookshelf;
