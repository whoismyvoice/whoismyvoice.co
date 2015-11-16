import React from 'react';

// Components
import BaseComponent from './BaseComponent';
import SearchInput from './SearchInput';
import SearchAddress from './SearchAddress';

class SearchGroup extends BaseComponent {
  render() {
    const {zip_code, error, did_search, repNum, state_full} = this.props;
  	if (repNum > 1 || did_search && repNum === undefined && error) {
  		return <div>
  			<i>Zip Code: {zip_code}</i><br />
  			<b>Please provide street name to get more specific result</b>
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

SearchGroup.propTypes = {
  repNum: React.PropTypes.number,
  zip_code: React.PropTypes.string,
  error: React.PropTypes.bool
};

export default SearchGroup;
