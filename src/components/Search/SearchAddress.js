import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Component
import SearchInput from './SearchInput';
import TextFormButton from '../Buttons/TextFormButton';

class SearchAddress extends Component {
  render() {
    const {
      address,
      isStreetAddressNeeded,
      onSubmit,
      placeholder,
      zipCode,
    } = this.props;
    const inputClasses = cx('input', {
      'address_search': isStreetAddressNeeded,
    });
    let formFields = [];
    if (isStreetAddressNeeded) {
      formFields = (
        <React.Fragment>
          <div key="zipCodeDisplay" className="locked__zip">
            ZIP: {zipCode}
          </div>
          <input
            key="zipCode"
            type="hidden"
            name="zipCode"
            value={zipCode}
          />
          <input
            key="address"
            className={inputClasses}
            type="text"
            name="address"
            defaultValue={address}
            placeholder={placeholder}
          />
        </React.Fragment>
      );
    } else {
      formFields = (
        <React.Fragment>
          <SearchInput
            key="zipCode"
            name="zipCode"
          />
        </React.Fragment>
      );
    }
    return (
      <form
        method="GET"
        onSubmit={onSubmit}
      >
        {formFields}
        <div className="line-seperator"></div>
        <TextFormButton
          text="Continue"
        />
      </form>
    );
  }
}

SearchAddress.defaultProps = {
  address: '',
  placeholder: 'Enter Your Street Address',
};

SearchAddress.propTypes = {
  address: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  zipCode: PropTypes.string,
};

export default SearchAddress;
