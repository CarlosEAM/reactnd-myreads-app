import React, {Component} from 'react';
import './App.css';


const bookCollection = [
  {category: "Currently Reading", title: "What up vietnam", authors: "Carlos EAM, Alfonso", img: "./logo512.png", group: 1},
  {category: "None", title: "Well if tomorrow", authors: "Pickard Ave", img: "./logo512.png", group: 4},
  {category: "Want to Read", title: "Something more", authors: "Sarah Commitment", img: "./logo512.png", group: 2},
  {category: "Read", title: "Hats, are for all", authors: "Amy L Sutton", img: "./logo512.png", group: 3},
  {category: "Currently Reading", title: "In the clouds", authors: "Sarah Commitment", img: "./logo512.png", group: 1}
];

const bookGroups = [
  'Currently Reading',
  'Want to Read',
  'Read'
];

/**
 * @description Create a Control Box
 * @param {object} props.bookGroup - the group the book belongs to
 * @param {object} props.bookGroups - list of book groups
 */
class ControlBox extends Component {
  render() {
    return (
      <div className="control-box">
        {this.props.bookGroups.map(group => {
          if (group === this.props.group) {
            return <p key={group} className="control-box-selected">{group}</p>
          }else{
            return <p key={group}>{group}</p>
          }
        })}
      </div>
    );
  }
}

/**
 * @description Create a Book
 * @param {object} props.book - book to compose
 * @param {object} props.bookGroups - to pass to control box
 */
class Book extends Component {
  render() {
    return (
      <article className="book">
        <img src={this.props.book.img} className="book-img" width="100" height="100" alt="" />
        <p className="book-title">{this.props.book.title}</p>
        <p className="book-author">{this.props.book.authors}</p>
        <ControlBox group={this.props.book.category} bookGroups={this.props.bookGroups} />
      </article>
    );
  }
}

/**
 * @description Creates a Book
 * @param {object} props.bookList - props passed from Bookshelf component
 * @param {object} props.group - current book group
 */
class Shelf extends Component {
  render() {
    let books = [];
    this.props.bookList.forEach(book => {
      if (book.category === this.props.group) {
        books.push(<Book key={book.title} book={book} bookGroups={this.props.bookGroups} />)
      }      
    });

    return (
      <section className="shelf">
        <h3 className="shelf-title">{this.props.group}</h3>
        <div className="books">{books}</div>
      </section>
    );
  }
}

/**
 * @description Creates a Bookshelf
 * @param {object} props.bookList - list of books
 * @param {object} props.bookGroups - list of book groups
 */
class Bookshelf extends Component {
  render() {
    let shelves = this.props.bookGroups.map(group => (
      <Shelf key={group} group={group} bookList={this.props.bookList} bookGroups={this.props.bookGroups} />
    ));

    return (
      <section className="bookshelf">
        <h2>BUILDING BOOKSHELF...</h2>
        <div className="shelves">{shelves}</div>
      </section>
    );
  }
}

function App() {

  return (
    <div className="App">
      <h1>MyReads</h1>
      <Bookshelf bookList={bookCollection} bookGroups={bookGroups} />
    </div>
  );
}

export default App;
