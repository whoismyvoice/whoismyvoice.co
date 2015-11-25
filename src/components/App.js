import React, {PropTypes} from 'react';
import style from '../styles/globals.scss';

// Components
import BaseComponent from './BaseComponent';
import Header from './Header';

class App extends BaseComponent {
  render() {
    return <div className="wrapper">
      <Header />
      {this.props.children}
    </div>;
  }
};

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
