import React, {Component} from 'react';
import './App.css';
import {update, search} from './BooksAPI';
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

DONE:
a, b, c, d, e, f
*/


/**
============================================================================================
 * @description Creates the search bar
 * param {array} props.searchTerms - list of term that can be searched for
 */
class SearchBar extends Component {
  render() {
    // console.log("SEARCH BAR: redering")
    return (
      <div className="search-bar">
        <input
          className="input-text"
          type="text"
          placeholder="Search book colletion"
          value={this.props.inputValue}
          onChange={this.props.onInputChange}
        />
      </div>
    )
  }
}

/**
=============================================================================================
 * @description Display search results
 * @param {object} props.listOfShelves - list of book shelves to pass to ShelfControlBox component
 */
class SearchResult extends Component {
  render() {
    // console.log("REARCH RESULTS: ", this.props.booksFound)
    // console.log("REARCH RESULTS: ")
    let results = (typeof this.props.booksFound === "string")
      ? this.props.booksFound
      : this.props.booksFound.map(book => (
        <BookCard
          key={book.id}
          aBook={book}
          listOfShelves={this.props.listOfShelves}
          onClick={(id, shelf) => this.props.onBookUpdate(id, shelf)}
        />
      ));
    // console.log(results)
    return(
      <div className="search-results">
        <h2>..BUILDING SEARCH RESULTS..</h2>
        <div>
          {results}
        </div>
      </div>
    );
  }
}

/**
=================================================================================================
 * @description Creates the Search page component
 */
class SearchPage extends Component {
  state = {
    query: '',
    booksFound: '',
    searching: false,
    clearResults: false,
  }

  // The whitelisted short collection of available search terms
  search_terms = [
    'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
  ];

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
    },
    {
      name: "none",
      slug: "none"
    }
  ]

  componentDidUpdate() {
    //console.log(`SEARCH PAGE: component did update:\nquery: ${this.state.query} \nbooksFound: ${this.state.booksFound} \nsearching: ${this.state.searching} \nclear screen: ${this.state.clearResults}`)
    
    // Debouncing search request to 600ms
    clearTimeout(this.timeout);
    if (this.state.query !== '' && this.state.searching) {
      this.timeout = setTimeout(() => {
        this.getBooks()
      }, 600);
    }
    // Remove search result on text clearing
    if (this.state.query === '' && this.state.clearResults) this.clearResults();  
  }

  handleInputChange = (query) => {
    // console.log("SEARCH PAGE: handing the input change")
    this.setState({
      query: query.target.value,
      searching: true,
    });
  }

  /**
   * @description Update a books shelf
   * @param {string} bookID - book id
   * @param {string} shelf - shelf slug
   */
  handleBookUpdate = (bookID, shelf) => {
    update({id: bookID}, shelf);
  }

  getBooks = () => {
    search(this.state.query).then(results => {
      // console.log("FETCH THE BOOKS")
      let result = (results.hasOwnProperty('error')) ? "No books found" : results;
      this.setState({
        booksFound: result,
        searching: false,
        clearResults: true
      });
    })
  }

  clearResults = () => {
    // console.log("CLEAR RESULTS")
    this.setState({
      booksFound: '',
      clearResults: false
    });
  }

   /**
   * @description Checks if the query exists in the whitelisted terms
   */
  // checkSearchTerm = () => {
  //   console.log("SEARCH BAR 3: checking the search terms");
  //   let exists = false;
  //   for (let i=0; i<this.props.searchTerms.length; i++) {
  //     if (this.props.searchTerms[i].toLowerCase().includes(this.state.query.toLowerCase())) {
  //       exists = true
  //       break;
  //     }
  //   }
  //   console.log("SEARCH BAR 4: the terms exists: ", exists)
  //   console.log("SEARCH BAR 5: calling parent")
  //   this.props.onSearch(this.state.query);
  // }

  render() {
    // console.log("SEARCH PAGE: rendering")
    return (
      <section className="search-page">
        <SearchBar onInputChange={this.handleInputChange} inputValue={this.state.query} />
        <SearchResult listOfShelves={this.shelves} booksFound={this.state.booksFound} onBookUpdate={this.handleBookUpdate} />
      </section>
    );
  }
}

/*
========================================================================================
*/
function App() {

  return (
    <div className="App">
      <h1>MyReads</h1>
      <SearchPage />
    </div>
  );
}

export default App;
