import { connect } from 'react-redux';
import { DispatchProps, StateProps, SearchGroup } from './SearchGroup';
import { Dispatch } from '../../actions/types';
import { State } from '../../store';
import { setAddress, setZipCode } from '../../actions';

function mapStateToProps(state: State): StateProps {
  const { address, officials, view } = state;
  const { addressErrorMessage } = view;
  return {
    address: address.street,
    addressErrorMessage,
    isStreetAddressNeeded:
      officials.ids.length === 2 ||
      addressErrorMessage === 'Failed to parse address',
    zipCode: address.zipCode,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onAddressSubmit: (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      const target = event.currentTarget;
      const addressNode = target.querySelector<HTMLInputElement>(
        'input[name="address"]'
      );
      const zipCodeNode = target.querySelector<HTMLInputElement>(
        'input[name="zipCode"]'
      );
      const streetAddress = addressNode?.value;
      const zipCode = zipCodeNode?.value;
      if (streetAddress) {
        const address = `${streetAddress}, ${zipCode}`;
        setAddress(address)(dispatch);
      } else {
        setZipCode(zipCode)(dispatch);
      }
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(SearchGroup);
