import React, {Component} from 'react';
import BookCard from './BookCard';


/**
 * @description Creates a Shelf, with the corresponding books
 * @param {string} props.name - the name for the current shelf
 * @param {string} props.slug - the slug for the current shelf
 * @param {array} props.books - array of book objects to shelf, includes books is all shelves
 * @param {object} props.listOfShelves - list of book shelves to pass to BookCard component
 */
class Shelf extends Component {
  render() {
    // Check if building a shelf of selected books or all books
    let bookList = [];
    if (this.props.name) {
      this.props.books.forEach((book, i) => {
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
            <BookCard key={book.id} aBook={book} listOfShelves={this.props.listOfShelves} />
          ))}
        </div>
      </section>
    );
  }
}

export default Shelf;
