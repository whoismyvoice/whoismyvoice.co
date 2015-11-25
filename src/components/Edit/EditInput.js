import React from 'react';

// Components
import BaseComponent from '../BaseComponent';

class EditInput extends BaseComponent {
  constructor() {
    super();
  }
  render() {
    const {value, onChange, placeholder, className, note, example, onBlur} = this.props;
  	return <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        onBlur={onBlur}
      />
      <i>{note}</i>
      <div className="example">{example}</div>
    </div>;
  }
}

export default EditInput;
