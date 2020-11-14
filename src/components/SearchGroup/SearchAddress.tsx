import React, { VFC } from 'react';
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

export const SearchAddress: VFC<Props> = (props) => {
  const {
    address = '',
    addressErrorMessage,
    isStreetAddressNeeded = false,
    onSubmit = () => void 0,
    placeholder = 'Enter Your Street Address',
    zipCode = '',
  } = props;
  const inputClasses = cx('input', {
    address_search: isStreetAddressNeeded,
  });
  let formFields: React.ReactFragment = <React.Fragment />;
  if (isStreetAddressNeeded) {
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
    <form method="GET" onSubmit={onSubmit} data-testid="search-address">
      {formFields}
      <div className="line-seperator" />
      <TextFormButton text="Continue" />
    </form>
  );
};
