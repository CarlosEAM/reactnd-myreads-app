import React, {Component} from 'react';
import {getAll} from './BooksAPI';
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
   * @description Place collection of books on t
   * @param {array} books - An array of book objects
   */
  setBooksOnShelves = books => {
    this.setState(prevState => ({
      booksOnShelves: [...prevState.booksOnShelves, ...books]
    }));
  }
  

  render() {
    return (
      <section className="bookshelf">
        <h2>BUILDING BOOKSHELF...</h2>
        {this.shelves.map(({name, slug}) => {
          return (slug !== "none") 
            ? <Shelf key={slug} name={name} slug={slug} books={this.state.booksOnShelves} listOfShelves={this.shelves} /> 
            : false
        })}
      </section>
    );
  }
}

export default Bookshelf;
