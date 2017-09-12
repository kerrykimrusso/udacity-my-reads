import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../service/BooksAPI';
import { createBookListItemFromBook as bookToListItem } from '../component/common/ComponentCreator';
import { getRandomLibraryBookFromShelf } from '../component/common/BookUtils';
import List from '../component/List';
import Nav from '../component/Navigation';
import TextInput from '../component/TextInput';
import qs from 'querystringify';
import serialize from 'form-serialize';
import ShelfEnum from '../enum/shelf.enum';


export default class SearchPage extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        imageLinks: PropTypes.objectOf(PropTypes.string).isRequired,
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        shelf: PropTypes.string.isRequired,
    })).isRequired,
    query: PropTypes.string,
	addBook: PropTypes.func.isRequired,
  }

  static defaultProps = {
      query: '',
  }
  
  static contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
        route: PropTypes.object.isRequired,
        staticContext: PropTypes.object
      })
  }

  state = {
    books: [],
    recommendations: [],
    baseBook: null
  }

  search = (query) => {
    if(!query) return;

    BooksAPI.search(query)
        .then((books) => {
            this.setState((prevState) => {
                return {
                    books: books.error ? [] : books
                }
            })
        });
  }

    getRecommendations(books) {
        const randomLibraryBook = this.getRandomBook(books);
        if(randomLibraryBook) this.getSimilarBooks(randomLibraryBook, 'title');
    }

    getRandomBook(books) {
        if(this.state.baseBook) return;
    
        const shelvesToPickRandomBook = [ShelfEnum.CURRENTLY_READING, ShelfEnum.WANT_TO_READ, ShelfEnum.READ];
        return getRandomLibraryBookFromShelf(shelvesToPickRandomBook, books);
    }

  getSimilarBooks(baseBook, property) {
      const notKeywords = {A:1, AN:1, WITH:1, THE:1, FOR:1, TO:1, IN:1, OF:1, IS:1, LEARNING:1};
      let isKeyword = (word) => {
        return !(word.toUpperCase() in notKeywords);
      };

      const query = baseBook[property] ? 
        baseBook[property].split(' ').filter(isKeyword)[0] : null;

        if(!query) return;

    BooksAPI.search(query, 5)
        .then((recommendations) => {
            this.setState((prevState) => {
                return {
                    baseBook,
                    recommendations: recommendations.error ? [] : recommendations
                }
            })
        });
  }

  createBookListItemFromBook = (book) => {
    return bookToListItem(book, this.onAddBookToShelf.bind(null, book));
}

onAddBookToShelf = (book, id, shelf) => {
    book.shelf = shelf;
    this.props.addBook(book);
}

onSearchSubmit = (e) => {
    e.preventDefault();

    const {history, route} = this.context.router;
    const searchFormData = serialize(e.target, { hash: true });
    const querystring = qs.parse(route.location.search);
    Object.assign(querystring, searchFormData)
    
    history.push(`${route.location.pathname}?${qs.stringify(querystring)}`);

    this.search(searchFormData.q);
}

componentWillMount = () => {
    const {query, books} = this.props;
    if(query) this.search(query, books);

    this.getRecommendations(books);
}

componentWillReceiveProps = (nextProps) => {
  this.getRecommendations(nextProps.books);
}

  render() {
    const listClasses = ['ui', 'items', 'unstackable'];

    const { books, recommendations } = this.state;
    const searchResults = books.map(this.createBookListItemFromBook);
    const recommendedItems = recommendations.map(this.createBookListItemFromBook);
    
    const {query} = this.props;

    return (
        <div className='app ui equal width grid container'>
            <Nav/>
            <div className='first equal width row'>
                <div className='column'>
                    <form className='ui fluid right action left icon input' onSubmit={this.onSearchSubmit}>
                        <i className='icon search'/>
                        <TextInput name='q' placeholder='Find a Book' value={query}/>
                        <button className='ui button'>Search</button>
                    </form>
                </div>
            </div>
            <div className='equal width row'>
                <div className='column'>
                    <List classes={listClasses} items={searchResults}/>
                </div>
            </div>
            {!this.state.books.length && this.state.baseBook && 
                <Recommendations listClasses={listClasses} baseBook={this.state.baseBook} bookItems={recommendedItems}/>}
        </div>
    );
  }
}

const Recommendations = ({listClasses, baseBook, bookItems}) => {
    return (
        <div className='equal width row'>
            <div className='column'>
                <h2 className='ui dividing header'>Because <em>{baseBook.title}</em> Is In Your Library</h2>
                <List classes={listClasses} items={bookItems} />
            </div>
        </div>
    );
}