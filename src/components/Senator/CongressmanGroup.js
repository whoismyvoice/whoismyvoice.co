import React from 'react';
import SenatorImg from './SenatorImg';
import SenatorName from './SenatorName';
import ArrowDown from '../ArrowDown';
import SearchAddress from '../SearchAddress';
import Settings from '../../data/settings.json';
import cx from 'classnames';

// Styles
import style from './../../styles/CongressmanGroup.scss';

const CongressmanGroup = React.createClass({
  render() {
    let searchClasses = 'search',
        wrapperClasses = 'senatorWrapper';

    const {representatives, zip_code} = this.props,
          {chamber} = Settings;

    if (representatives) {
      searchClasses = cx(
        ['search'],
        {'hide': representatives.length < 2 || chamber === 'senate'},
      );
      wrapperClasses = cx(
        ['senatorWrapper'],
        {'several': representatives.length > 1}
      );
    } else {
      searchClasses = 'search';
    }

    const members = (representatives || []).map(function(item, idx) {
      return <div className="senatorContainer" key={idx}>
        <SenatorImg
          bioguide={item.bioguide_id}
        />

        <SenatorName
          name={item.full_name}
          age={item.age}
          state={item.state}
          voted={item.voted}
        />

        <ArrowDown
          id={idx}
          additional={item.additional}
          double={"true"}
          color="orange-text"
        />
      </div>;
    });
    return <div className={wrapperClasses}>
      {members}

      <div className={searchClasses}>
        <b>Find specific congressional district and representative</b>
        <SearchAddress
          color="orange"
          zip_code={zip_code}
        />
      </div>
    </div>;
  }
});

CongressmanGroup.propTypes = {
  representatives: React.PropTypes.array,
  zip_code: React.PropTypes.string
};

export default CongressmanGroup;
