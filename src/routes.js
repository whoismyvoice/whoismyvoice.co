import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import About from './components/About';

const routes = (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="About" component={About} />
    </Route>
    <Route path="*" component={Home}/>
  </Router>
);

export default routes;
