import React, {Component} from 'react';
import BookCard from './BookCard';


/**
 * @description Creates a Shelf, with the corresponding books
 * @param {string} props.name - the name for the current shelf
 * @param {string} props.slug - the slug for the current shelf
 * @param {array} props.booksOnShelves - book list in bookshelf
 * @param {object} props.shelves - list of available book shelves
 * @param {function} props.onBookUpdate - function to update a books shelf
 */
class Shelf extends Component {
  render() {
    // Check if building a shelf of selected books or all books
    let bookList = [];
    if (this.props.name) {
      this.props.booksOnShelves.forEach((book, i) => {
        if (book.shelf === this.props.slug) {
          bookList.push(book);
        }
      });
    } else {
      bookList = this.props.books;
    }

    return (
      <section className="shelf">
        <h3 className="shelf-title">{this.props.name}</h3>
        <div className="books">
          {bookList.map(book => (
            <BookCard
              key={book.id}
              aBook={book}
              shelves={this.props.shelves}
              booksOnShelves={this.props.booksOnShelves}
              onBookUpdate={this.props.onBookUpdate}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default Shelf;
