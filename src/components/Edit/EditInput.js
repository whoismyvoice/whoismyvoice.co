import React from 'react';

// Components
import BaseComponent from '../BaseComponent';

class EditInput extends BaseComponent {
  constructor() {
    super();
  }

  _onChange(event) {
    this.props.onChange(event);
  }

  render() {
  	return <div>
      {this.props.title}
      <input type="text" onChange={this._onChange} />
    </div>;
  }
};

export default EditInput;
