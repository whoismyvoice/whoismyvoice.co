import React, {PropTypes} from 'react';

// Components
import MenuButton from './MenuButton';

// Styles
import style from '../styles/globals.scss';

const App = (props) => {
  return <div className="wrapper">
  <MenuButton />
    {props.children}
  </div>;
};

App.propTypes = {
  children: React.PropTypes.object.isRequired
};

export default App;
