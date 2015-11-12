import React, {PropTypes} from 'react';
import style from './../styles/globals.scss';

// Components
import Header from './Header';

class App extends React.Component{
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
