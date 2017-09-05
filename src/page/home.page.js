import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from '../component/List';
import BookListItem from '../component/BookListItem'
import ShelfEnum from '../enum/shelf.enum';

export default class HomePage extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
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
      return (<BookListItem 
        key={book.id}
        id={book.id}
        imageSrc={book.imageLinks.smallThumbnail}
        title={book.title}
        subtitle={book.subtitle}
        authors={book.authors}
        description={book.description}
        shelf={book.shelf}
        onChangeShelf={this.props.changeShelf}
      />);
    };

  render() {
    const listClasses = ['ui', 'items', 'unstackable'];

    let currentlyReading = this.getCurrentlyReading().map(this.createBookListItemFromBook);
    let wantToRead = this.getWantToRead().map(this.createBookListItemFromBook);
    let read = this.getRead().map(this.createBookListItemFromBook);
    
    return (
      <div className='app ui equal width grid container'>
        <div className='equal width row'>
          <div className='column'>
            <h2 className='ui header'>Currently Reading</h2>
            <List classes={listClasses} items={currentlyReading} />
          </div>
          <div className='column'>
            <h2 className='ui header'>Want to Read</h2>
            <List classes={listClasses} items={wantToRead} />
          </div>
          <div className='column'>
            <h2 className='ui header'>Read</h2>
            <List classes={listClasses} items={read} />
          </div>
        </div>
      </div>
    );
  }
}
