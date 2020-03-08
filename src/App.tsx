import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// Components
import MenuButton from './components/MenuButton';

// Routes
import About from './routes/About';
import Home from './routes/Home';
import Sources from './routes/Sources';

import store from './store';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

class Routes extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <div className="wrapper">
        <MenuButton />
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/about" component={About} />
          <Route exact={true} path="/sources" component={Sources} />
        </Switch>
      </div>
    );
  }
}

export class App extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <Provider store={store}>
        <Router>
          <Routes />
        </Router>
      </Provider>
    );
  }
}

export default App;
