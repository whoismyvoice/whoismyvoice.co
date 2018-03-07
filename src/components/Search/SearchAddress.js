import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Component
import SearchInput from './SearchInput';
import TextButton from '../Buttons/TextButton';

class SearchAddress extends Component {
  constructor(props) {
    super(props);
    this.onTextButtonClick = this.onTextButtonClick.bind(this);
  }

  onTextButtonClick(event) {
    event.preventDefault();
    this.formRef.submit();
  }

  render() {
    const {
      address,
      error,
      isStreetAddressNeeded,
      onSubmit,
      placeholder,
      zipCode,
    } = this.props;
    const inputClasses = cx(
      [
        'input',
      ],
      {
        'error': error,
        'address_search': isStreetAddressNeeded,
      },
    );
    let formFields = [];
    if (isStreetAddressNeeded) {
      formFields = [
        <div key="zipCodeDisplay" className="locked__zip">
          ZIP: {zipCode}
        </div>,
        <input
          key="zipCode"
          type="hidden"
          name="zipCode"
          value={zipCode}
        />,
    		<input
          key="address"
          className={inputClasses}
          type="text"
          name="address"
          defaultValue={address}
    			placeholder={placeholder}
    		/>
      ];
    } else {
      formFields = [
      	<SearchInput
          key="zipCode"
          error={error}
          name="zipCode"
      	/>
      ];
    }
  	return (
      <form
        method="GET"
        onSubmit={onSubmit}
        ref={(form) => { this.formRef = form; }}
      >
        {formFields}
        <div className="line-seperator"></div>
        <TextButton
          text="Continue"
          onClick={this.onTextButtonClick}
        />
      </form>
    );
  }
}

SearchAddress.defaultProps = {
  address: '',
  onSubmit: () => {},
  placeholder: 'Enter Your Street Address',
};

SearchAddress.propTypes = {
  address: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchAddress;
