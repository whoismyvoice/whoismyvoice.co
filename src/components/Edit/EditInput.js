import React from 'react';

// Components
import BaseComponent from '../BaseComponent';

class EditInput extends BaseComponent {
  render() {
  	return <div>
      {this.props.title}
      <input type="text" />
    </div>;
  }
};

export default EditInput;
