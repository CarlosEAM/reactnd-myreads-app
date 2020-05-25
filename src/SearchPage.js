import React, {Component} from 'react';
import {update, search} from './BooksAPI';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';


/**
 * @description Creates the Search page component
 */
class SearchPage extends Component {
  /**
   * query - input text passed down from SearchBar component
   * booksFound - holds the results of a book search
   * searching - when doing a database search
   * clearResults - clear page from book results
   */
  state = {
    query: '',
    booksFound: '',
    searching: false,
    clearResults: false,
  }

  // Shelves with their name and slug
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

  // Using this method to request books from the database
  componentDidUpdate() {
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

  /**
   * @description For a controlled component
   * @param {string} query - input text passed down from SearchBar component
   */
  handleInputChange = (query) => {
    this.setState({
      query: query.target.value,
      searching: true,
    });
  }

  /**
   * @description Updates the shelf a book belongs to
   * @param {string} bookID - book id
   * @param {string} shelf - shelf slug
   */
  handleBookUpdate = (bookID, shelf) => {
    update({id: bookID}, shelf);
  }

  /**
   * @description Request book search from database
   */
  getBooks = () => {
    search(this.state.query).then(results => {
      let result = (results.hasOwnProperty('error')) ? "No books found" : results;
      this.setState({
        booksFound: result,
        searching: false,
        clearResults: true
      });
    })
  }

  /**
   * @description Clear book results from SearchResult component
   */
  clearResults = () => {
    this.setState({
      booksFound: '',
      clearResults: false
    });
  }

  render() {
    return (
      <section className="search-page">
        <SearchBar onInputChange={this.handleInputChange} inputValue={this.state.query} />
        <SearchResult listOfShelves={this.shelves} booksFound={this.state.booksFound} onBookUpdate={this.handleBookUpdate} />
      </section>
    );
  }
}

export default SearchPage;
