import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getAll,update} from './BooksAPI';
import Shelf from './Shelf';


/**
 * @description Creates a Bookshelf
 * @param {object} props.bookList - list of books
 */
class Bookshelf extends Component {
  state = {
    booksOnShelves: [],
  }

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
      name: "None",
      slug: "none"
    }
  ];

  componentDidMount() {
    getAll().then(books => this.setState({
      booksOnShelves: books
    }));
  }

  /**
   * @description Update a books current shelf
   * @param {string} bookID - book id
   * @param {string} shelf - shelf slug
   */
  handleBookUpdate = (bookID, shelf) => {
    this.setState(prevState => ({
      booksOnShelves: prevState.booksOnShelves.filter(book => {
        if (shelf === "none") return false;
        if (book.id === bookID) book.shelf = shelf;
        return book;
      })
    }));
    update({id: bookID}, shelf);
  }

  render() {    
    return (
      <section className="bookshelf">
        <Link
          to="/search"
          className="nav-search-btn"
        >Search</Link>
        <h2>BUILDING BOOKSHELF...</h2>
        {this.shelves.map(({name, slug}) => {
          return (slug !== "none") 
            ? <Shelf
                key={slug}
                name={name}
                slug={slug}
                books={this.state.booksOnShelves}
                listOfShelves={this.shelves}
                onBookUpdate={this.handleBookUpdate}
              />
            : false
        })}
        <button onClick={this.test}>TEST</button>
        <button onClick={this.checkState}>CHECK STATE</button>
      </section>
    );
  }
}

export default Bookshelf;
