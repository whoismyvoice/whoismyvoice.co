import React from 'react';
import ReactDOM from 'react-dom';
import mixpanel from 'mixpanel-browser';

import './styles/globals.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Init MixPanel
mixpanel.init('582e6e69efcbe83615181fab6f29d7b3');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
