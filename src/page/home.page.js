import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from '../component/List';
import { createBookListItemFromBook as bookToListItem } from '../component/common/ComponentCreator';
import ShelfEnum from '../enum/shelf.enum';
import Nav from '../component/Navigation';
import { getBooksOnShelf } from '../component/common/BookUtils';

export default class HomePage extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        imageLinks: PropTypes.objectOf(PropTypes.string).isRequired,
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        authors: PropTypes.arrayOf(PropTypes.string),
        shelf: PropTypes.string.isRequired,
	})).isRequired,
	changeShelf: PropTypes.func.isRequired,
  }

	createBookListItemFromBook = (book) => {
		return bookToListItem(book, this.props.changeShelf);
	}

  render() {
    const listClasses = ['ui', 'items', 'unstackable'];
    const books = this.props.books;
    let currentlyReading = getBooksOnShelf(ShelfEnum.CURRENTLY_READING, books).map(this.createBookListItemFromBook);
    let wantToRead = getBooksOnShelf(ShelfEnum.WANT_TO_READ, books).map(this.createBookListItemFromBook);
    let read = getBooksOnShelf(ShelfEnum.READ, books).map(this.createBookListItemFromBook);
    
    return (
      <div className='app ui equal width grid container'>
        <Nav />
        <div className='first equal width row'>
          <div className='column'>
            <h2 className='ui dividing header'>Currently Reading</h2>
            <List classes={listClasses} items={currentlyReading} />
          </div>
          <div className='column'>
            <h2 className='ui dividing header'>Want to Read</h2>
            <List classes={listClasses} items={wantToRead} />
          </div>
          <div className='column'>
            <h2 className='ui dividing header'>Read</h2>
            <List classes={listClasses} items={read} />
          </div>
        </div>
      </div>
    );
  }
}
