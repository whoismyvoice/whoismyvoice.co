import 'babel/polyfill';
import 'normalize.css';
import './styles/globals.scss';
import React from 'react';
import Router from 'react-router';
import { render } from 'react-dom';
import createHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

// Expose globally
window.React = React;

render(
  <Router
    children={routes}
    history={createHistory()}
   />,
  document.getElementById('root')
);
