import React from 'react';
import cx from 'classnames';

import SearchInput from './SearchInput';

const SearchGroup = React.createClass({
  render() {
    return <div>
      <SearchInput
        error={this.props.error}
      />
    </div>;
  }
});

export default SearchGroup;
