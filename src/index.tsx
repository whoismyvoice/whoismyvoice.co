/// <reference types="node" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as mixpanel from 'mixpanel-browser';

import './styles/globals.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Init MixPanel
if (process.env.REACT_APP_MIXPANEL_TOKEN) {
  mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN);
} else {
  mixpanel.disable();
}

const root = document.getElementById('root');
if (root !== undefined && root !== null) {
  ReactDOM.render(<App />, root);
}
registerServiceWorker();
