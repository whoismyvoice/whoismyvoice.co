import React from 'react';

// Components
import BaseComponent from '../BaseComponent';

class EditInput extends BaseComponent {
  constructor() {
    super();
  }

  render() {
  	return <div>
      <b>{this.props.title}</b><br />
      <i>{this.props.note}</i>
      <div className="example">
        {this.props.example}
      </div>
      <input
        type="text"
        value={this.props.value}
        onChange={this.props.onChange}
        placeholder={this.props.placeholder}
      />
    </div>;
  }
};

export default EditInput;
