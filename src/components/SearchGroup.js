import React from 'react';
import SenateStore from '../stores/SenateStore';
import SettingsJSON from './../data/settings.json';

// Components
import BaseComponent from './BaseComponent';
import SearchInput from './SearchInput';
import SearchAddress from './SearchAddress';

class SearchGroup extends BaseComponent {
  constructor() {
    super();
    this.state = SenateStore.getMember();
  }

  render() {
    const {zip_code, error, did_search, number_representatives, state_full, settings} = this.state;
    const SavedSettings = settings ? settings : SettingsJSON;

  	if (number_representatives > 1 && SavedSettings.chamber === 'house' || did_search && number_representatives === undefined && error) {
  		return <div>
  			<i>Zip Code: {zip_code}</i><br />
  			<b>Please provide street name to find out which congressman represents you</b>
  			<SearchAddress
  				error={error}
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
};

export default SearchGroup;
