import React, {Component} from 'react';


/**
 * @description Create a Shelf Control Box to view and amend where a book belongs
 * @param {object} props.shelf - the shelf the book belongs to
 * @param {array} props.listOfShelves - list of book shelves objects
 * @param {function} props.onClick - updates the books shelf to selection
 */
class ShelfControlBox extends Component {
  render() {
    return (
      <ul className="control-box">
        {this.props.listOfShelves.map((shelf, i) => {
          const listKey = shelf.slug + shelf.slug.length;
          if (shelf.slug === this.props.shelf) {
            return <li key={listKey} className="control-item-selected" onClick={()=>this.props.onClick(shelf.slug)}>{shelf.name}</li>
          }else{
            return <li key={listKey} onClick={()=>this.props.onClick(shelf.slug)}>{shelf.name}</li>
          }
        })}
      </ul>
    );
  }
}

export default ShelfControlBox;