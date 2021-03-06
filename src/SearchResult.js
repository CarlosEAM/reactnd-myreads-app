import React from 'react';
import BookCard from './BookCard';

/**
 * @description Display search results
 * @param {object} props.shelves - list of book shelves to pass to ShelfControlBox component
 * @param {array} props.booksFound - list of book objects found
 * @param {array} props.booksOnShelves - book list in bookshelf
 * @param {function} props.onBookUpdate - function to update a books shelf
 */
function SearchResult(props) {
  // Prepare the search results
  let results = (typeof props.booksFound === "string")
    ? props.booksFound
    : props.booksFound.map(book => (
      <BookCard
        key={book.id}
        aBook={book}
        shelves={props.shelves}
        booksOnShelves={props.booksOnShelves}
        onBookUpdate={props.onBookUpdate}
      />
    ));
  return(
    <div className="search-results">
      <div className="books">
        {results}
      </div>
    </div>
  );
}

export default SearchResult;
