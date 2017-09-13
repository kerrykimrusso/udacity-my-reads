import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import fetch from 'isomorphic-fetch';
import { BrowserRouter } from 'react-router-dom';

global.fetch = fetch;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
});
