import React from 'react';
import cx from 'classnames';

// Component
import { SearchInput } from './SearchInput';
import TextFormButton from '../Buttons/TextFormButton';

interface Props {
  address?: string;
  addressErrorMessage?: string;
  isStreetAddressNeeded: boolean;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  zipCode?: string;
}

export class SearchAddress extends React.Component<Props> {
  static defaultProps: Props = {
    address: '',
    addressErrorMessage: undefined,
    isStreetAddressNeeded: false,
    onSubmit: () => undefined,
    placeholder: 'Enter Your Street Address',
    zipCode: '',
  };

  render(): JSX.Element {
    const { address, addressErrorMessage, onSubmit, placeholder } = this.props;
    const inputClasses = cx('input', {
      // eslint-disable-next-line @typescript-eslint/camelcase
      address_search: this.props.isStreetAddressNeeded,
    });
    let formFields: React.ReactFragment = <React.Fragment />;
    if (this.props.isStreetAddressNeeded) {
      const zipCode = this.props.zipCode;
      formFields = (
        <React.Fragment>
          <p>Multiple Congressional Representatives in</p>
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
