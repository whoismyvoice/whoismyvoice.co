import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import About from './components/About'
import Sources from './components/Sources'
import Senators from './components/Senators'
import NoMatch from './components/NoMatch'

const routes = (
  <Router>
    <Route component={App}>
    	<Route path="/" component={Home} />
    	<IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="sources" component={Sources} />
      <Route path="hfc" component={Senators} />
      <Route path=":zip" component={Home} />
      <Route path="*" component={Home}/>
    </Route>
  </Router>
);

export default routes;
