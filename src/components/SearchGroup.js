import React from 'react';
import cx from 'classnames';

import SearchInput from './SearchInput';

const SearchGroup = React.createClass({
  render() {

  	if(this.props.repNum > 3) {
  		return <div>
  			More than 3
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
