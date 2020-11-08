/// <reference types="node" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles/globals.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const loadComponent = (Component: typeof App): void => {
  const root = document.getElementById('root');
  if (root !== undefined && root !== null) {
    ReactDOM.render(<Component />, root);
  }
};
loadComponent(App);
registerServiceWorker();

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    loadComponent(NextApp);
  });
}
