import React from 'react';
import SenatorImg from './SenatorImg';
import SenatorName from './SenatorName';
import ArrowDown from '../ArrowDown';
import SearchAddress from '../SearchAddress';
import SenateConstants from '../../constants/SenateConstants';
import cx from 'classnames';

// Styles
import style from './../../styles/CongressmanGroup.scss';

const CongressmanGroup = React.createClass({
  propTypes: {
    representatives: React.PropTypes.array,
    zip_code: React.PropTypes.string
  },
  render() {
    let searchClasses = 'search',
        wrapperClasses = 'senatorWrapper';

    const reps = this.props.representatives;

    if (reps) {
      searchClasses = cx(
        ['search'],
        {'hide': reps.length < 2 || SenateConstants.CHAMBER === 'senate'},
      );
      wrapperClasses = cx(
        ['senatorWrapper'],
        {'several': reps.length > 1}
      );
    } else {
      searchClasses = 'search';
    }

    const representatives = (this.props.representatives || []).map(function(item, idx) {
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
      {representatives}

      <div className={searchClasses}>
        <b>Find specific congressional district and representative</b>
        <SearchAddress
          zip_code={this.props.zip_code}
        />
      </div>
    </div>;
  }
});
export default CongressmanGroup;
