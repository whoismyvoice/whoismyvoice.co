import * as React from 'react';
import { connect } from 'react-redux';

// Components
import { Dispatch } from '../../actions/types';
import { State } from '../../store';
import SearchAddress from './SearchAddress';
import { setAddress, setZipCode } from '../../actions';

type Props = StateProps & DispatchProps;

interface StateProps {
  address?: string;
  addressErrorMessage?: string;
  isStreetAddressNeeded: boolean;
  zipCode?: string;
}

interface DispatchProps {
  onAddressSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export class SearchGroup extends React.Component<Props> {
  static defaultProps = {
    addressErrorMessage: undefined,
    isStreetAddressNeeded: false,
    onAddressSubmit: () => undefined,
  };

  render() {
    const {
      address,
      addressErrorMessage,
      isStreetAddressNeeded,
      onAddressSubmit,
      zipCode,
    } = this.props;
    return (
      <div className="animated fadeIn">
        <SearchAddress
          address={address}
          addressErrorMessage={addressErrorMessage}
          isStreetAddressNeeded={isStreetAddressNeeded}
          onSubmit={onAddressSubmit}
          zipCode={zipCode}
        />
      </div>
    );
  }
}

function mapStateToProps(state: State): StateProps {
  const { address, officials, view } = state;
  const { addressErrorMessage } = view;
  return {
    address: address.street,
    addressErrorMessage,
    isStreetAddressNeeded: officials.ids.length === 2,
    zipCode: address.zipCode,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onAddressSubmit: (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const target = event.currentTarget;
      const addressNode = target.address;
      const zipCodeNode = target.zipCode;
      const streetAddress = addressNode && addressNode.value;
      const zipCode = zipCodeNode && zipCodeNode.value;
      if (streetAddress) {
        const address = `${streetAddress}, ${zipCode}`;
        setAddress(address)(dispatch);
      } else {
        setZipCode(zipCode)(dispatch);
      }
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchGroup);
