import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TextInput extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    validator: PropTypes.func,
    onChange: PropTypes.func,
  }

  state = {
      value: '',
      error: null
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState((prevState) => {
      return {
        value: nextProps.value,
      }
    });
  }

  onChange = (e) => {
      const {name, validator, onChange} = this.props;
      const newValue = e.target.value;
      const newState = {
        value: newValue,
        error: validator && validator(newValue)
      };

      this.setState(() => {
        if(onChange) onChange(name, newValue, newState.error);
        return newState;
      });
  }

  render() {
      const {value} = this.state;
      const {name, placeholder} = this.props;

    return (
        <input name={name} type="text" placeholder={placeholder} value={value} onChange={this.onChange}/>
    )
  }
}
