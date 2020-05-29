import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {search} from './BooksAPI';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';


/**
 * @description Creates the Search page component
 * @param {array} props.shelves - list of available book shelves
 * @param {array} props.booksOnShelves - book list in bookshelf
 * @param {function} props.onBookUpdate - function to update a books shelf
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
        <Link
          to="/"
          className="nav-home-btn"
        >Back</Link>
        <SearchBar
          onInputChange={this.handleInputChange}
          inputValue={this.state.query}
        />
        <SearchResult
          shelves={this.props.shelves}
          booksFound={this.state.booksFound}
          booksOnShelves={this.props.booksOnShelves}
          onBookUpdate={this.props.onBookUpdate}
        />
      </section>
    );
  }
}

export default SearchPage;
