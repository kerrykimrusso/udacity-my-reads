import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './service/BooksAPI';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import HomePage from './page/home.page';
import SearchPage from './page/search.page';
import qs from 'querystringify';

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

  addBook = (book) => {
    this.setState((prevState) => {
      return {
        books: [...prevState.books, book]
      }
    })
  }

  changeShelf = (id, toShelf) => {
    let bookToUpdate;
    const books = this.state.books.map((book) => {
      const updatedBook = {
        shelf: toShelf
      };

      if(id === book.id) {
        bookToUpdate = book;
        return Object.assign({}, book, updatedBook);
      }

      return book;
    });

    this.setState((prevState) => {
      return {
        books
      };
    });

    BooksAPI.update(bookToUpdate, toShelf);
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => <HomePage books={this.state.books} changeShelf={this.changeShelf}/> }/>
        <Route exact path='/search' render={({location}) => {
          const query = qs.parse(location.search).q;
          return <SearchPage books={this.state.books} query={query} changeShelf={this.changeShelf}/> 
        }}/>
      </div>
    );
  }
}

export default App;
