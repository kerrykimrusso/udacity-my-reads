import React, { Component } from 'react';
import * as BooksAPI from './service/BooksAPI.mock';
import 'semantic-ui-css/semantic.min.css';
import List from './component/SemanticUiList';
import BookListItem from './component/BookListItem'
import ShelfEnum from './enum/shelf.enum';

class App extends Component {
  state = {
    books: []
  }

  componentWillMount = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState((prevState) => {
          return {
            books
          }
        })
      });
  }
  
  getCurrentlyReading = () => this.state.books.filter((book) => book.shelf === ShelfEnum.CURRENTLY_READING);

  getWantToRead = () => this.state.books.filter((book) => book.shelf === ShelfEnum.WANT_TO_READ);

  getRead = () => this.state.books.filter((book) => book.shelf === ShelfEnum.READ);

  createBookListItemFromBook = (book) => <BookListItem 
    key={book.id}
    id={book.id}
    imageSrc={book.imageLinks.smallThumbnail}
    title={book.title}
    subtitle={book.subtitle}
    authors={book.authors}
    description={book.description} 
    shelfControl={''}
  />;

  render() {
    const listClasses = ['ui', 'items', 'unstackable'];

    let currentlyReading = this.getCurrentlyReading().map(this.createBookListItemFromBook);
    let wantToRead = this.getWantToRead().map(this.createBookListItemFromBook);
    let read = this.getRead().map(this.createBookListItemFromBook);
    
    return (
      <div className="app">
        <List classes={listClasses} items={currentlyReading} />
        <List classes={listClasses} items={wantToRead} />
        <List classes={listClasses} items={read} />
      </div>
    );
  }
}

export default App;
