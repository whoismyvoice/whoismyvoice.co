import React from 'react';

// Components
import BaseComponent from '../BaseComponent';
import MemberImg from './MemberImg';
import MemberName from './MemberName';

// Styles
import style from './../../styles/HFCGroup.scss';

class HFCGroup extends BaseComponent {
  render() {
    const {bioguide, name, age, state, twitter, did_search} = this.props;

    return <a target="_blank" href={`http://twitter.com/home/?status=@${twitter}`}>
      <div className="HFCMember">
        <MemberImg
          group={'true'}
          bioguide={bioguide}
        />
        <MemberName
          name={name}
          age={age}
          state={state}
          twitter={twitter}
          did_search={did_search}
        />
      </div>
    </a>;
  }
};

HFCGroup.propTypes = {
  age: React.PropTypes.number,
  bioguide: React.PropTypes.string,
  did_search: React.PropTypes.bool,
  name: React.PropTypes.string,
  state: React.PropTypes.string,
  twitter: React.PropTypes.string,
};

export default HFCGroup;