import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getAll} from './BooksAPI';
import Shelf from './Shelf';


/**
 * @description Creates a Bookshelf
 * @param {object} props.bookList - list of books
 * @param {array} props.shelves - list of available book shelves
 * @param {array} props.booksOnShelves - book list in bookshelf
 * @param {function} props.onBookUpdate - function to update a books shelf
 * @param {function} props.onBookshelfUpdate - function to update parents bookshelf list
 */
class Bookshelf extends Component {
  state = {
    booksOnShelves: [],
  }

  componentDidMount() {
    // Only request the latest books on home page load
    getAll().then(books => {
      // Update parent state with it
      this.props.onBookshelfUpdate(books)
    });
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
                booksOnShelves={this.props.booksOnShelves}
                shelves={this.props.shelves}
                onBookUpdate={this.props.onBookUpdate}
              />
            : false
        })}
      </section>
    );
  }
}

export default Bookshelf;
