import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class BookListItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    shelfControl: PropTypes.node,
  }

  render() {
    let {imageSrc, title, subtitle, authors, shelfControl} = this.props;
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
                    {shelfControl}
                </div>
            </div>
        </div>
    );
  }
}

export default BookListItem
