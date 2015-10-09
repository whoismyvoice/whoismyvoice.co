import React from 'react';
import { Link } from 'react-router';

// Styles
import style from './../styles/SearchInput.scss';

const SearchInput = React.createClass({
  render() {
    return (
    	<input type="text" placeholder="Enter Your Zip Code">
    	</input>
    );
  }
});

export default SearchInput;
