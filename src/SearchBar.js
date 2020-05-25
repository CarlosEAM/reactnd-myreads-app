import React from 'react';

/**
 * @description Creates the search bar
 * param {string} props.inputValue - controlled value from SearchPage component (parent)
 * param {function} props.onInputChange - takes the input text
 */
function SearchBar(props) {
  return (
    <div className="search-bar">
      <input
        className="input-text"
        type="text"
        placeholder="Search book colletion"
        value={props.inputValue}
        onChange={props.onInputChange}
      />
    </div>
  )
}

export default SearchBar;
