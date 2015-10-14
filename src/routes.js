import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import NoMatch from './components/NoMatch';

const routes = (
  <Router>
    <Route component={App}>
    	<Route path="/" component={Home} />
    	<IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path=":zip" component={Home} />
    </Route>
    <Route path="*" component={NoMatch}/>
  </Router>
);

export default routes;

//<Route path="/:zip" component={Home} />
