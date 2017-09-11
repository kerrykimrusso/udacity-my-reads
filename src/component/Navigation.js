import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Navigation extends Component {
  render() {
    return (
        <div className='ui borderless main menu fixed'>
            <div className='ui text container'>
                <div className='header item'>
                    Booked!
                </div>
                <NavLink exact className='item' to='/'>Library</NavLink>
                <NavLink exact className='item' to='/search'>Find a Book</NavLink>
            </div>
        </div>
    )
  }
}
