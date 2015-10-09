import React, {PropTypes} from 'react';
import style from './../styles/About.scss';

const App = React.createClass({

  propTypes: typeof __DEV__ && {
    children: PropTypes.object.isRequired
  },

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

export default App;
