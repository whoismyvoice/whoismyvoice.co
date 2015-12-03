import React, {PropTypes} from 'react';

// Components
import BaseComponent from './BaseComponent';
import MenuButton from './MenuButton';

// Styles
import style from '../styles/globals.scss';

class App extends BaseComponent {
  render() {
    return <div className="wrapper">
    <MenuButton />
      {this.props.children}
    </div>;
  }
}

App.PropTypes = {
  children: PropTypes.object.isRequired
};

export default App;
