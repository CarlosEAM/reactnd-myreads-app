import React, {Component} from 'react';
import './App.css';
import BookCard from './BookCard';

/*
TODO:
a) As the user types into the search field, books that match the query 
    are displayed on the page, along with their titles and authors. 
    You can use throttle/debounce but are not required to do so.
b) Search results are not shown when all of the text is deleted out of the search input box.
c) Invalid queries are handled and prior search results are not shown.
d) The search works correctly when a book does not have a thumbnail or an author. 
    (To test this, try searching for "poetry" and "biography").
    (It's fine to filter out books with missing thumbnails.)
e) The user is able to search for multiple words, such as “artificial intelligence.”
f) Do selections made on the search page show up on the main page?.
*/


/**
 * @description Creates the search bar
 */
class SearchBar extends Component {
  state = {
    query: ''
  }

  // Its own source of truth
  updateQuery = (query) => {
    this.setState(() => ({
      query: query
    }))
  }

  render() {
    return (
      <div className="search-bar">
        <input
          className="input-text"
          type="text"
          placeholder="Search book colletion"
          onChange={(event) => this.updateQuery(event.target.value)}
        />
      </div>
    )
  }
}

/**
 * @description Display search results
 * @param {object} props.listOfShelves - list of book shelves to pass to ShelfControlBox component
 */
class SearchResult extends Component {
  render() {
    return(
      <div className="search-results">
        <h2>..BUILDING SEARCH RESULTS..</h2>
      </div>
    );
  }
}

/**
 * @description Creates the Search page component
 */
class SearchPage extends Component {
  shelves = [
    {
      name: "Currently Reading",
      slug: "currentlyReading"
    },
    {
      name: "Want To Read",
      slug: "wantToRead"
    },
    {
      name: "Read",
      slug: "read"
    }
  ];

  render() {
    return (
      <section className="search-page">
        <SearchBar />
        <SearchResult listOfShelves={this.shelves} />
      </section>
    );
  }
}


function App() {

  return (
    <div className="App">
      <h1>MyReads</h1>
      <SearchPage />
    </div>
  );
}

export default App;
