import React from 'react';


/**
 * @description Create a Shelf Control Box to view and amend where a book belongs
 * @param {object} props.shelf - the shelf the book belongs to
 * @param {array} props.listOfShelves - list of book shelves objects
 */
const ShelfControlBox = props => {
  let controlList = [];
  for (let i=0; i<4; i++) {
    if (i<3) {
      controlList.push(props.listOfShelves[i].slug)
    } else {
      controlList.push("none")
    }    
  }
  return (
    <ul className="control-box">
      {props.listOfShelves.map((shelf, i) => {
        const listKey = shelf.slug + shelf.slug.length;
        if (shelf.slug === props.shelf) {
          return <li key={listKey} className="control-item-selected">{shelf.name}</li>
        }else{
          return <li key={listKey}>{shelf.name}</li>
        }
      })}
    </ul>
  );
}

export default ShelfControlBox;