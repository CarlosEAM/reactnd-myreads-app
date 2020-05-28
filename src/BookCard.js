import React, {Component} from 'react';
import ShelfControlBox from './ShelfControlBox';


/**
 * @description Creates a Book
 * @param {object} props.aBook - a book to compose
 * @param {object} props.shelves - list of available book shelves
 * @param {function} props.onBookUpdate - function to update a books shelf
 */
class BookCard extends Component {
  handleClick = (bookID, bookSlug) => {
    this.props.onBookUpdate(bookID, bookSlug);
  }
  render() {
    const {title} = this.props.aBook;
    const thumbnail = (this.props.aBook.hasOwnProperty("imageLinks"))
      ? this.props.aBook.imageLinks.thumbnail 
      : <img src="#" alt="no book cover found" />
    const authors = (this.props.aBook.hasOwnProperty("authors"))
      ? this.props.aBook.authors.map(author => (<p key={this.props.aBook.id + author}>{author}</p>))
      : "No authors found";

    return (
      <div className="book">
        <img src={thumbnail} className="book-img" width="100" height="100" alt="" />
        <p className="book-title">{title}</p>
        <div className="book-author">
          {authors}
        </div>
        <ShelfControlBox
          shelf={this.props.aBook.shelf}
          shelves={this.props.shelves}
          onBookUpdate={(bookSlug) => this.handleClick(this.props.aBook.id, bookSlug)}
        />
      </div>
    );
  }
}

export default BookCard;