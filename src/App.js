import React, {Component} from 'react';
import './App.css';
import Shelf from './Shelf';


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
        {this.shelves.map(({name, slug}) => {
          return (slug !== "none") 
            ? <Shelf key={slug} name={name} slug={slug} books={bookCollection} listOfShelves={this.shelves} /> 
            : false
        })}
      </section>
    );
  }
}


function App() {

  return (
    <div className="App">
      <h1>MyReads</h1>
      <Bookshelf />
    </div>
  );
}

export default App;
