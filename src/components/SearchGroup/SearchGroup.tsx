import React, { VFC } from 'react';

// Components
import { SearchAddress } from './SearchAddress';

export interface StateProps {
  address?: string;
  addressErrorMessage?: string;
  isStreetAddressNeeded?: boolean;
  zipCode?: string;
}

export interface DispatchProps {
  onAddressSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface Props extends StateProps, DispatchProps {}

export const SearchGroup: VFC<Props> = (props) => {
  const {
    address,
    addressErrorMessage,
    isStreetAddressNeeded = false,
    onAddressSubmit = () => void 0,
    zipCode,
  } = props;
  return (
    <div className="animated fadeIn" data-testid="search-group">
      <SearchAddress
        address={address}
        addressErrorMessage={addressErrorMessage}
        isStreetAddressNeeded={isStreetAddressNeeded}
        onSubmit={onAddressSubmit}
        zipCode={zipCode}
      />
    </div>
  );
};
