/* @flow weak */
import App from './app.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import Rollbar from 'rollbar-browser';


document.addEventListener('DOMContentLoaded', () => {
  startRollbar();
  ReactDOM.render(<App history={true}/>, document.getElementById('app-main'));
});


function startRollbar() {
  const {hostname, protocol, port} = window.location;
  const portString = port === '' ? '' : `:${port}`;
  const environment = `${protocol}//${hostname}${portString}`;

  window.rollbar = Rollbar.init({
    accessToken: "de42c0395e924afba679510bd16908a6",
    captureUncaught: true,
    captureUnhandledRejections: false,
    payload: {
      environment: environment
    }
  });
}