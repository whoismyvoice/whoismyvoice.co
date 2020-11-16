import React, { lazy, Suspense, VFC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// Components
import MenuButton from './components/MenuButton';

// Routes
import Home from './routes/Home';

import store from './store';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const About = lazy(() => import('./routes/About'));
const Sources = lazy(() => import('./routes/Sources'));

const Routes: VFC<Props> = () => (
  <div className="wrapper">
    <MenuButton />
    <Suspense fallback={<div className="loading"></div>}>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/about" component={About} />
        <Route exact={true} path="/sources" component={Sources} />
      </Switch>
    </Suspense>
  </div>
);

export const App: VFC<Props> = () => (
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>
);

export default App;
