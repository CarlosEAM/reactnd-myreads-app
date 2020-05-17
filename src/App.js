import React, {Component} from 'react';
import './App.css';

// TODO: delete DEMO book collection
const bookCollection = [
  {
    id: "eefd1", 
    shelf: "currentlyReading",
    title: "What up vietnam",
    authors: ["Carlos EAM", "Alfonso"],
    imageLinks: {
      smallThumbnail: "./logo512.png",
      thumbnail: "./logo512.png"
    },
  },
  {
    id: "eefd2", 
    shelf: "none",
    title: "Well if tomorrow",
    authors: ["Pickard Ave"],
    imageLinks: {
      smallThumbnail: "./logo512.png",
      thumbnail: "./logo512.png"
    },
  },
  {
    id: "eefd3", 
    shelf: "wantToRead",
    title: "Something more",
    authors: ["Sarah Commitment"],
    imageLinks: {
      smallThumbnail: "./logo512.png",
      thumbnail: "./logo512.png"
    },
  },
  {
    id: "eefd4", 
    shelf: "read",
    title: "Hats, are for all",
    authors: ["Amy L Sutton"],
    imageLinks: {
      smallThumbnail: "./logo512.png",
      thumbnail: "./logo512.png"
    },
  },
  {
    id: "eefd5", 
    shelf: "currentlyReading",
    title: "In the clouds",
    authors: ["Sarah Commitment", "Amy L Sutton"],
    imageLinks: {
      smallThumbnail: "./logo512.png",
      thumbnail: "./logo512.png"
    },
  }
];


/**
 * @description Create a Shelf Control Box to view and amend where a book belongs
 * @param {object} props.shelf - the shelf the book belongs to
 * @param {array} props.listOfShelves - list of book shelves objects
 */
const ShelfControlBox = props => {
  console.log("CHANGE: ", Object.values(props.listOfShelves));
  return (
    <ol className="control-box">
      {props.listOfShelves.map(shelf => {
        if (shelf.slug === props.shelf) {
          return <li key={props.bookID} className="control-box-selected">{shelf.name}</li>
        }else{
          return <li key={props.bookID}>{shelf.name}</li>
        }
      })}
    </ol>
  );
}

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
            <p key={author}>{author}</p>
          ))}
        </div>
        <ShelfControlBox shelf={this.props.aBook.shelf} listOfShelves={this.props.listOfShelves} />
      </div>
    );
  }
}

/**
 * @description Creates a Shelf, with the corresponding books
 * @param {string} props.name - the name for the current shelf
 * @param {string} props.slug - the slug for the current shelf
 * @param {array} props.books - array of book objects to shelf, includes books is all shelves
 * @param {object} props.listOfShelves - list of book shelves to pass to BookCard component
 */
class Shelf extends Component {
  render() {
    // Check if building a shelf of selected books or all books
    let bookList = [];
    if (this.props.name) {
      this.props.books.forEach((book, i) => {
        if (book.shelf === this.props.slug) {
          bookList.push(book);
        }
      });
    } else {
      bookList = this.props.books;
    }

    return (
      <section className="shelf">
        <h3 className="shelf-title">{this.props.name}</h3>
        <div className="books">
          {bookList.map(book => (
            <BookCard key={book.id} aBook={book} listOfShelves={this.props.listOfShelves} />
          ))}
        </div>
      </section>
    );
  }
}

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
    }
  ];

  componentDidMount() {
    this.setBooksOnShelves(bookCollection);
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
        {this.shelves.map(({name, slug}) => (
          <Shelf key={slug} name={name} slug={slug} books={bookCollection} listOfShelves={this.shelves} />
        ))}
      </section>
    );
  }
}


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
        {bookCollection.map(book => (
          <BookCard aBook={book} listOfShelves={this.props.listOfShelves} />
        ))}
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
    </div>
  );
}

export default App;
