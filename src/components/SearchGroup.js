import React from 'react';
import cx from 'classnames';

import SearchInput from './SearchInput';
import SearchAddress from './SearchAddress';

const SearchGroup = React.createClass({
  render() {

  	if(this.props.repNum > 3) {
  		return <div>
  			<i>Zip Code: {this.props.zip_code}</i><br />
  			<b>Please provide street name to get more specific result</b>
  			<SearchAddress
  				error={this.props.error}
  			/>
  		</div>;
  	} else {
    	return <div>
      	<SearchInput
        	error={this.props.error}
      	/>
    	</div>;
    }
  }
});

export default SearchGroup;
