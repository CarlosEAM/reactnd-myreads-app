import React, {Component} from 'react';


/**
 * @description Create a Shelf Control Box to view and amend where a book belongs
 * @param {object} props.shelf - the shelf the book belongs to
 * @param {array} props.shelves - list of available book shelves
 * @param {function} props.onBookUpdate - function to update a books shelf
 */
class ShelfControlBox extends Component {
  render() {
    return (
      <div className="control-box">
        <div className="control-box-wrapper">
          <div className="control-box-title">
            <h5>Move book to</h5>
          </div>
          <ul className="control-box-list">
            {this.props.shelves.map((shelf, i) => {
              const listKey = shelf.slug + shelf.slug.length;
              if (shelf.slug === this.props.shelf) {
                return (
                  <li
                    key={listKey}
                    className="control-box-item item-selected"
                    onClick={()=>this.props.onBookUpdate(shelf.slug)}
                  >{shelf.name}
                  </li>
                )
              }else{
                return (
                  <li
                    key={listKey}
                    className="control-box-item"
                    onClick={()=>this.props.onBookUpdate(shelf.slug)}
                  >{shelf.name}
                  </li>
                )
              }
            })}
          </ul>
        </div>
        <span className="control-btn"></span>
      </div>
    );
  }
}

export default ShelfControlBox;
