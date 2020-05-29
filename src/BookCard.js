import React, {Component} from 'react';
import ShelfControlBox from './ShelfControlBox';


/**
 * @description Creates a Book
 * @param {object} props.aBook - a book to compose
 * @param {object} props.shelves - list of available book shelves
 * @param {array} props.booksOnShelves - book list in bookshelf
 * @param {function} props.onBookUpdate - function to update a books shelf
 */
class BookCard extends Component {
  handleClick = (bookID, bookSlug) => {
    this.props.onBookUpdate(bookID, bookSlug);
  }

  render() {
    let {authors, imageLinks, shelf, title} = this.props.aBook;

    // handle missing author
    const hasAuthors = (authors !== undefined)
      ? authors.map(author => (<p key={this.props.aBook.id + author}>{author}</p>))
      : "No authors found";

    // handle missing thumbnail
    const hasThumbnail = (imageLinks !== undefined)
      ? imageLinks.thumbnail 
      : '#'
    console.log(hasThumbnail)

    // Undefined means raw book result. Check if it exists in bookshelf
    if (shelf === undefined) {
      this.props.booksOnShelves.forEach(book => {
        if (book.id === this.props.aBook.id) shelf = book.shelf;
      });
    }

    return (
      <div className="book">
        <img src={hasThumbnail} className="book-img" width="100" height="100" alt="" />
        <p className="book-title">{title}</p>
        <div className="book-author">
          {hasAuthors}
        </div>
        <ShelfControlBox
          shelf={shelf}
          shelves={this.props.shelves}
          onBookUpdate={(bookSlug) => this.handleClick(this.props.aBook.id, bookSlug)}
        />
      </div>
    );
  }
}

export default BookCard;