/// <reference types="node" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as mixpanel from 'mixpanel-browser';

import './styles/globals.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Init MixPanel
if (process.env.NODE_ENV === 'production') {
  mixpanel.init('582e6e69efcbe83615181fab6f29d7b3');
} else {
  mixpanel.init('50ebae8c5fa7e5222b2271df8b73e91d');
}

const root = document.getElementById('root');
if (root !== undefined && root !== null) {
  ReactDOM.render(<App />, root);
}
registerServiceWorker();
