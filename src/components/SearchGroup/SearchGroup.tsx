import * as React from 'react';

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

export class SearchGroup extends React.Component<Props> {
  static defaultProps: Props = {
    addressErrorMessage: undefined,
    isStreetAddressNeeded: false,
    onAddressSubmit: () => undefined,
  };

  render(): JSX.Element {
    const {
      address,
      addressErrorMessage,
      isStreetAddressNeeded,
      onAddressSubmit,
      zipCode,
    } = this.props;
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
  }
}
