import React from 'react';

// Components
import BaseComponent from '../BaseComponent';
import Dropdown from 'react-dropdown';

class EditDropdown extends BaseComponent {
  constructor() {
    super();
  }

  render() {
  	return <div>
      <b>{this.props.title}</b><br />
      <i>{this.props.note}</i>
      <Dropdown
        options={this.props.options}
        onChange={this.props.onChange}
        placeholder={this.props.placeholder}
      />
    </div>;
  }
};

export default EditDropdown;
