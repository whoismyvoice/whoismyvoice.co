import React, {PropTypes} from 'react';
import style from './../styles/globals.scss';

// Components
import Header from './Header';

const App = React.createClass({
  propTypes: typeof __DEV__ && {
    children: PropTypes.object.isRequired
  },

  render() {
    return <div className="wrapper">
      <Header />
      {this.props.children}
    </div>;
  }
});

export default App;
