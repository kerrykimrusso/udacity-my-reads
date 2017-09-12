import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../service/BooksAPI';
import { createBookListItemFromBook as bookToListItem } from '../component/common/ComponentCreator';
import { getRandomLibraryBookFromShelf, getShelfWordingForRecommendationTitle } from '../component/common/BookUtils';
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
    baseBook: null,
  }

  idsOfBooksInLibraryToShelf = {};

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

    setShelfOfBook(booksToUpdate, bookIdsToShelf) {
        booksToUpdate.forEach((book) => {
            if(book.id in bookIdsToShelf) book.shelf = bookIdsToShelf[book.id];
        });

        return booksToUpdate;
    }

  getSimilarBooks(baseBook, property) {
      const notKeywords = {A:1, AN:1, WITH:1, THE:1, FOR:1, TO:1, IN:1, OF:1, IS:1, LEARNING:1, MEAN:1};
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
        if(!('q' in searchFormData)) searchFormData.q = '';
        const querystring = qs.parse(route.location.search);
        Object.assign(querystring, searchFormData)
        
        history.push(`${route.location.pathname}?${qs.stringify(querystring)}`);

        this.search(searchFormData.q);
    }

    componentWillMount = () => {
        const {query, books} = this.props;
        if(query.length) this.search(query, books);
        else this.getRecommendations(books);
    }

    componentWillReceiveProps = (nextProps) => {
        this.getRecommendations(nextProps.books);
        
        if(nextProps.query.length === 0) {
            this.setState((prevState) => {
                return {
                    books: [],
                }
            })
        }
        nextProps.books.forEach((book) => {
            this.idsOfBooksInLibraryToShelf[book.id] = book.shelf;
        });
    }

  render() {
    const listClasses = ['ui', 'items', 'unstackable'];

    const { books, recommendations, baseBook } = this.state;
    const searchResults = this.setShelfOfBook(books, this.idsOfBooksInLibraryToShelf)
        .map(this.createBookListItemFromBook);
    const recommendedItems = this.setShelfOfBook(recommendations, this.idsOfBooksInLibraryToShelf)
        .map(this.createBookListItemFromBook);
    
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
            <div className='equal width row centered'>
                {query.length > 0 && <SearchResultsCount count={books.length}/>}
            </div>
            <div className='equal width row'>
                <div className='column'>
                    <List classes={listClasses} items={searchResults}/>
                </div>
            </div>
            {books.length === 0 && baseBook && 
                <Recommendations listClasses={listClasses} baseBook={baseBook} bookItems={recommendedItems}/>}
        </div>
    );
  }
}

const Recommendations = ({listClasses, baseBook, bookItems}) => {
    return (
        <div className='equal width row'>
            <div className='column'>
                <h2 className='ui dividing header'>Because You {getShelfWordingForRecommendationTitle(baseBook.shelf)} <em>{baseBook.title}</em> </h2>
                <List classes={listClasses} items={bookItems} />
            </div>
        </div>
    );
}

const SearchResultsCount = ({count}) => {
    return (
        <div className='ui mini horizontal statistic'>
            <div className='value'>{count}</div> 
            <div className='label'>Books Found!</div>
        </div>
    )
}