import React from 'react';
import BookCard from './BookCard';

/**
 * @description Display search results
 * @param {object} props.listOfShelves - list of book shelves to pass to ShelfControlBox component
 * @param {array} props.booksFound - list of book objects found
 */
function SearchResult(props) {
  // Prepare the search results
  let results = (typeof props.booksFound === "string")
    ? props.booksFound
    : props.booksFound.map(book => (
      <BookCard
        key={book.id}
        aBook={book}
        listOfShelves={props.listOfShelves}
        onClick={(id, shelf) => props.onBookUpdate(id, shelf)}
      />
    ));
  return(
    <div className="search-results">
      <div>
        {results}
      </div>
    </div>
  );
}

export default SearchResult;
