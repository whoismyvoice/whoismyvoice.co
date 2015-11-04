import React from 'react';
import SenatorImg from './SenatorImg';
import SenatorName from './SenatorName';
import ArrowDown from '../ArrowDown';
import SearchAddress from '../SearchAddress';

// Styles
import style from './../../styles/SenatorGroup.scss';

const SenatorGroup = React.createClass({
  render() {
    const additional = this.props.additional;
    if (additional !== null) {
      const additional_mid_name = additional.middle_name === null ? '' : additional.middle_name,
          additional_bioguide = additional.bioguide_id,
          additional_name = additional.first_name + ' ' + additional_mid_name + ' ' + additional.last_name || '',
          additional_age = (2015-additional.birthday.substring(0,4)) || null;

      return <div className="senatorWrapper">

          <div className="senatorContainer">
            <SenatorImg
              bioguide={this.props.bioguide}
            />

            <SenatorName
              name={this.props.name}
              age={this.props.age}
              state={this.props.state}
              did_search={this.props.did_search}
            />

            <ArrowDown id="0" additional={this.props.additional} double={"true"} color="orange-text" />
          </div>

          <div className="connectingLine"></div>

          <div className="senatorContainer">
            <SenatorImg
              bioguide={additional_bioguide}
            />

            <SenatorName
              name={additional_name}
              age={additional_age}
              state={this.props.state}
              did_search={this.props.did_search}
            />

            <ArrowDown id="1" additional={this.props.additional} double={"true"} color="orange-text" />
          </div>

          <SearchAddress
            zip_code={this.props.zip_code}
          />

        </div>;
    } else {
      return <div>
        <SenatorImg
          bioguide={this.props.bioguide}
          single={true}
        />

        <SenatorName
          hfc={this.props.hfc}
          name={this.props.name}
          age={this.props.age}
          state={this.props.state}
          did_search={this.props.did_search}
        />
    </div>;
    }
  }
});

export default SenatorGroup;
