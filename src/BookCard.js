import React, {Component} from 'react';
import ShelfControlBox from './ShelfControlBox';
import noImage from './icons/noImage.png'


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
      : <p>No authors found</p>;

    // handle missing thumbnail
    const hasThumbnail = (imageLinks !== undefined)
      ? imageLinks.thumbnail
      : noImage;

    // Undefined means raw book result. Check if it exists in bookshelf
    if (shelf === undefined) {
      for (let i=0; i<this.props.booksOnShelves.length; i++) {
        let book = this.props.booksOnShelves[i];
        if (book.id === this.props.aBook.id) {
          shelf = book.shelf;
          break;
        } else {
          shelf = 'none';
        }
      }
    }

    return (
      <div className="book-wrapper">
        <div className="book-card">
          <img src={hasThumbnail} className="book-card-img" width="100" height="100" alt="" />
          <p className="book-card-title">{title}</p>
          <div className="book-card-author">
            <span>by:</span>
            {hasAuthors}
          </div>
          <ShelfControlBox
            shelf={shelf}
            shelves={this.props.shelves}
            onBookUpdate={(bookSlug) => this.handleClick(this.props.aBook.id, bookSlug)}
          />
        </div>
      </div>
    );
  }
}

export default BookCard;
