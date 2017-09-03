import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Dropdown extends Component {
  static propTypes = {
      options: PropTypes.arrayOf(PropTypes.shape({
          value: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          isSelected: PropTypes.bool,
      })).isRequired,
      onChange: PropTypes.func.isRequired,
  }

  onChange = (e) => {
    e.preventDefault();
    this.props.onChange(e.target.value);
  }

  render() {
    let options = this.props.options.map((option) => <option key={option.value} value={option.value}>{option.text}</option>);
    
    return (
        <div>
            <select onChange={this.onChange}>
                {options}
            </select>
        </div>
    )
  }
}
