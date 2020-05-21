import React, {Component} from 'react';
import ShelfControlBox from './ShelfControlBox';


/**
 * @description Creates a Book
 * @param {object} props.aBook - a book to compose
 * @param {object} props.listOfShelves - list of book shelves to pass to ShelfControlBox component
 * @param {function} props.onClick - requests a books new shelf update
 */
class BookCard extends Component {
  handleClick = (bookID, bookSlug) => {
    this.props.onClick(bookID, bookSlug);
  }
  render() {
    return (
      <div className="book">
        <img src={this.props.aBook.imageLinks.thumbnail} className="book-img" width="100" height="100" alt="" />
        <p className="book-title">{this.props.aBook.title}</p>
        <div className="book-author">
          {this.props.aBook.authors.map(author => (
            <p key={this.props.aBook.title.length + author.length}>{author}</p>
          ))}
        </div>
        <ShelfControlBox
          shelf={this.props.aBook.shelf}
          listOfShelves={this.props.listOfShelves}
          onClick={(bookSlug) => this.handleClick(this.props.aBook.id, bookSlug)}
        />
      </div>
    );
  }
}

export default BookCard;