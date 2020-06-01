import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
  componentDidMount() {
    // Request a fresh list on each page load
    this.props.getBookshelf();
  }

  render() {
    return (
      <section className="bookshelf">
        <header className="bookshelf-title">
          <h1 onClick={() => {alert(window.innerWidth)}}>MyReads</h1>
        </header>
        {this.props.shelves.map(({name, slug}) => {
          return (slug !== "none")
            ? (
                <Shelf
                  key={slug}
                  name={name}
                  slug={slug}
                  booksOnShelves={this.props.booksOnShelves}
                  shelves={this.props.shelves}
                  onBookUpdate={this.props.onBookUpdate}
                />
              )
            : false
        })}
        <div className="nav-search-link">
          <Link to="/search">+</Link>
        </div>
      </section>
    );
  }
}

export default Bookshelf;
