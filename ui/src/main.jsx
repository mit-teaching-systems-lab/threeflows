// @flow
import App from './app.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App history={true}/>, document.getElementById('app-main'));
});
