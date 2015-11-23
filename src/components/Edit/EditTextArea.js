import React from 'react';

// Components
import BaseComponent from '../BaseComponent';

class EditTextArea extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    const {placeholder, onChange, note, example} = this.props;
  	return <div>
      <textarea
        type="text"
        placeholder={placeholder}
        onChange={onChange}
      /><br />
      <i>{note}</i><br />
      <div className="example">
        {example}
      </div>
    </div>;
  }
};

export default EditTextArea;
