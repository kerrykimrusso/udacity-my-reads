import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from '../component/List';
import { createBookListItemFromBook as bookToListItem } from '../component/common/ComponentCreator';
import ShelfEnum from '../enum/shelf.enum';
import Nav from '../component/Navigation';

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

  getCurrentlyReading = () => this.props.books.filter((book) => book.shelf === ShelfEnum.CURRENTLY_READING);
  
    getWantToRead = () => this.props.books.filter((book) => book.shelf === ShelfEnum.WANT_TO_READ);
  
    getRead = () => this.props.books.filter((book) => book.shelf === ShelfEnum.READ);

	createBookListItemFromBook = (book) => {
		return bookToListItem(book, this.props.changeShelf);
	}

  render() {
    const listClasses = ['ui', 'items', 'unstackable'];

    let currentlyReading = this.getCurrentlyReading().map(this.createBookListItemFromBook);
    let wantToRead = this.getWantToRead().map(this.createBookListItemFromBook);
    let read = this.getRead().map(this.createBookListItemFromBook);
    
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
