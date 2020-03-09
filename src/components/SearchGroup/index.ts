import { connect } from 'react-redux';
import { DispatchProps, StateProps, SearchGroup } from './SearchGroup';
import { Dispatch } from '../../actions/types';
import { State } from '../../store';
import { setAddress, setZipCode, receiveZipCodeInvalid } from '../../actions';

const ZIP_CODE_REGEX = /^\d{4,}.*$/;

function isZipCodeValid(zipCode?: string): zipCode is string {
  return typeof zipCode === 'string' && ZIP_CODE_REGEX.test(zipCode);
}

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
      } else if (isZipCodeValid(zipCode)) {
        setZipCode(zipCode)(dispatch);
      } else {
        dispatch(receiveZipCodeInvalid());
      }
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(SearchGroup);
