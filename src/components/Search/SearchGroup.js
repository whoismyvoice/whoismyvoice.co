import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';

// Components
import SearchAddress from './SearchAddress';
import {
  setAddress,
  setZipCode,
} from '../../actions';

export class SearchGroup extends Component {
  static defaultProps = {
    isStreetAddressNeeded: false,
    onAddressSubmit: () => {},
  }

  static propTypes = {
    address: PropTypes.string,
    isStreetAddressNeeded: PropTypes.bool.isRequired,
    onAddressSubmit: PropTypes.func.isRequired,
    zipCode: PropTypes.string,
  }

  render() {
    const {
      address,
      isStreetAddressNeeded,
      onAddressSubmit,
      zipCode,
    } = this.props;
    return (
      <div className="animated fadeIn">
  			<SearchAddress
          address={address}
          isStreetAddressNeeded={isStreetAddressNeeded}
          onSubmit={onAddressSubmit}
          zipCode={zipCode}
  			/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { address, officials, } = state;
  return {
    address: address.street,
    isStreetAddressNeeded: officials.ids.length === 2,
    zipCode: address.zipCode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddressSubmit: (event) => {
      event.preventDefault();
      const streetAddress = event.target.elements.address && event.target.elements.address.value;
      const zipCode = event.target.elements.zipCode.value;
      if (streetAddress) {
        const address = `${streetAddress}, ${zipCode}`;
        dispatch(setAddress(address));
      } else {
        dispatch(setZipCode(zipCode));
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchGroup);
