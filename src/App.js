// @flow

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// Components
import MenuButton from './MenuButton';

// Routes
import About from './routes/About';
import Home from './routes/Home';
import Sources from './routes/Sources';

import store from './store';

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Routes />
        </Router>
      </Provider>
    );
  }
}

class Routes extends Component<Props> {
  render() {
    return (
      <div className="wrapper">
        <MenuButton />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/sources" component={Sources} />
        </Switch>
      </div>
    );
  }
}

export default App;
