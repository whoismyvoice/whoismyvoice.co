import React from 'react';
import SenateStore from '../../stores/SenateStore';

// Components
import BaseComponent from '../BaseComponent';
import SearchInput from './SearchInput';
import SearchAddress from './SearchAddress';

class SearchGroup extends BaseComponent {
  constructor() {
    super();
    this.state = SenateStore.getMember();
  }

  render() {
    const {zip_code, error, did_search, state_full, number_house} = this.state;
    if (did_search && number_house > 1) {
      return <div className="animated fadeIn">
  			<div className="locked__zip">ZIP: {zip_code}</div>
  			<SearchAddress
  				error={error}
          search_address={true}
          zip_code={zip_code}
          state_full={state_full}
  			/>
  		</div>;
    } else {
      return <div>
      	<SearchInput
        	error={error}
      	/>
    	</div>;
    }
  }
}

export default SearchGroup;
