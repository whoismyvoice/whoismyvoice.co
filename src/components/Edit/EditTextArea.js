import React from 'react';

// Components
import BaseComponent from '../BaseComponent';

class EditTextArea extends BaseComponent {
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
      <textarea
        type="text"
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
      />
    </div>;
  }
};

export default EditTextArea;
