import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../service/BooksAPI';
import { createBookListItemFromBook as bookToListItem } from '../component/common/ComponentCreator';
import List from '../component/List';
import Nav from '../component/Navigation';
import TextInput from '../component/TextInput';
import qs from 'querystringify';
import serialize from 'form-serialize';

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
	changeShelf: PropTypes.func.isRequired,
  }
  
  static contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
        route: PropTypes.object.isRequired,
        staticContext: PropTypes.object
      })
  }

  state = {
    books: []
  }

  search = (query) => {
    BooksAPI.search(query)
        .then((books) => {
            this.setState((prevState) => {
                return {
                    books
                }
            })
        });
  }

  createBookListItemFromBook = (book) => {
    return bookToListItem(book, this.props.changeShelf);
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

componentDidMount = () => {
  if(this.props.query) this.search(this.props.query);
}

  render() {
    const listClasses = ['ui', 'items', 'unstackable'];
    const searchResults = this.state.books.map(this.createBookListItemFromBook);
    const {query} = this.props;

    return (
        <div className='app ui equal width grid container'>
            <Nav/>
            <div className='first equal width row'>
                <div className='column'>
                    <form className='ui fluid right action left icon input' onSubmit={this.onSearchSubmit}>
                        <i className='icon search'/>
                        <TextInput name='q' placeholder='Find a Book' value={query} ref={(node) => this.searchInput = node}/>
                        <button className='ui button'>Search</button>
                    </form>
                </div>
            </div>
            <div className='equal width row'>
                <div className='column'>
                    <List classes={listClasses} items={searchResults}/>
                </div>
            </div>
        </div>
    );
  }
}
