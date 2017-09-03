import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ShelfEnum from '../enum/shelf.enum';
import Dropdown from './Dropdown'

export class BookListItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    shelf: PropTypes.string.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }

  options = [
    {
        value: '',
        text: 'Move to...',
        isSelected: true
    },
    {
        value: ShelfEnum.CURRENTLY_READING,
        text: ShelfEnum.stringFromEnum(ShelfEnum.CURRENTLY_READING)
    },
    {
        value: ShelfEnum.WANT_TO_READ,
        text: ShelfEnum.stringFromEnum(ShelfEnum.WANT_TO_READ)
    },
    {
        value: ShelfEnum.READ,
        text: ShelfEnum.stringFromEnum(ShelfEnum.READ)
    },
  ]

  render() {
    let {id, imageSrc, title, subtitle, authors, shelf, onChangeShelf} = this.props;
    subtitle = subtitle ? `: ${subtitle}` : '';
    authors = authors.join(', ');

    return (
        <div className='ui item segment'>
            <div className='ui tiny image'>
                <img src={imageSrc} alt={`${title}${subtitle} by ${authors}`}/>
            </div>
            <div className='content'>
                <h1 className='header'>{`${title}${subtitle}`}</h1>
                <div className='meta'>
                    <span>{authors}</span>
                </div>
                <div className='extra'>
                    <Dropdown 
                        options={this.options.filter((option) => option.value !== shelf)} 
                        onChange={(shelf) => {
                            onChangeShelf(id, shelf);
                        }} 
                        />
                </div>
            </div>
        </div>
    );
  }
}

export default BookListItem
