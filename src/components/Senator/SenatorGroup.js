import React from 'react';
import SenatorImg from './SenatorImg'
import SenatorName from './SenatorName'
import ArrowDown from '../ArrowDown'

// Styles
import style from './../../styles/SenatorGroup.scss';

const SenatorGroup = React.createClass({
  render() {

    let additional = this.props.additional;

    if (additional !== null) {
      
      let additional_mid_name = additional.middle_name === null ? '' : additional.middle_name,
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

            <ArrowDown id="0" />
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

            <ArrowDown id="1" />
          </div>

        </div>;
    } else {
      return <div>
        <SenatorImg
          bioguide={this.props.bioguide}
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
