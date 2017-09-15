import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from './List';

export default class ListWithHeader extends Component {
  static propTypes = {
    headingText: PropTypes.string,
    classes: PropTypes.any,
    items: PropTypes.arrayOf(PropTypes.element).isRequired,
  }

  render() {
      const {headingText, classes, items} = this.props;

    return (
      <div>
        <h2 className='ui dividing header'>{headingText}</h2>
        <List classes={classes} items={items} />
      </div>
    )
  }
}
