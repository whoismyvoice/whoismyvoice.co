import * as React from 'react';
import * as cx from 'classnames';

// Component
import SearchInput from './SearchInput';
import TextFormButton from '../Buttons/TextFormButton';

interface Props {
  address?: string;
  addressErrorMessage?: string;
  isStreetAddressNeeded: boolean;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  zipCode?: string;
}

class SearchAddress extends React.Component<Props> {
  static defaultProps = {
    address: '',
    addressErrorMessage: undefined,
    isStreetAddressNeeded: false,
    onSubmit: () => undefined,
    placeholder: 'Enter Your Street Address',
    zipCode: '',
  };

  render() {
    const { address, addressErrorMessage, onSubmit, placeholder } = this.props;
    const inputClasses = cx('input', {
      address_search: this.props.isStreetAddressNeeded,
    });
    let formFields: React.ReactFragment = <React.Fragment />;
    if (this.props.isStreetAddressNeeded) {
      const zipCode = this.props.zipCode;
      formFields = (
        <React.Fragment>
          <div key="zipCodeDisplay" className="locked__zip">
            ZIP: {zipCode}
          </div>
          <input key="zipCode" type="hidden" name="zipCode" value={zipCode} />
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
          <SearchInput errorMessage={addressErrorMessage} name="zipCode" />
        </React.Fragment>
      );
    }
    return (
      <form method="GET" onSubmit={onSubmit}>
        {formFields}
        <div className="line-seperator" />
        <TextFormButton text="Continue" />
      </form>
    );
  }
}

export default SearchAddress;
