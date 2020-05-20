import React, {Component} from 'react';
import ShelfControlBox from './ShelfControlBox';


/**
 * @description Creates a Book
 * @param {object} props.aBook - a book to compose
 * @param {object} props.listOfShelves - list of book shelves to pass to ShelfControlBox component
 */
class BookCard extends Component {
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
        />
      </div>
    );
  }
}

export default BookCard;