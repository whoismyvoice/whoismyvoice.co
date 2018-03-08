import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Components
import TextButton from './Buttons/TextButton';
import MemberResults from './MemberResults';
import { Legislator, PropType as LegislatorType, } from '../models/Legislator';

class Results extends Component {
  static defaultProps = {
    backgroundClasses: '',
    destroy: () => {},
    didSearch: false,
    numberHouse: 0,
    numberRepresentatives: 0,
    representatives: [],
  }

  static propTypes = {
    backgroundClasses: PropTypes.any,
    destroy: PropTypes.func,
    didSearch: PropTypes.bool.isRequired,
    numberHouse: PropTypes.number,
    numberRepresentatives: PropTypes.number,
    representatives: PropTypes.arrayOf(LegislatorType),
  }

  render() {
    const {
      didSearch,
      numberHouse,
      numberRepresentatives,
      representatives,
    } = this.props;

    const backgroundClasses = cx(
      [
        'second-wrapper',
      ],
      {
        'move-up': didSearch,
      },
    );

    let first_rep, second_rep;

    // Check if representatives exist and that they have the correct numer of members
    if (representatives && numberRepresentatives > 2 && numberHouse === 1) {
      let count = 0;
      // Assign member values to vars to ensure fullPage support (vs. dynamic rendering)
      for (let i = 0; i < representatives.length; i++) {
        if (representatives[i].payment > 0) {
          count++;
        }
      }
      // Check whether representatives received any contributions to divide them into groups
      if (count === 0 || count === 1 || count === 3) {
        first_rep = representatives.slice(0, 1);
        second_rep = representatives.slice(1, 3);
      } else if (count === 2) {
        first_rep = representatives.slice(0, 2);
        second_rep = representatives.slice(2, 3);
      }
    }

    return (
      <div className={backgroundClasses} id="fullpage">
        <div className="section block section-two">
          <TextButton
            text="Back"
            onClick={this._handleRestart}
          />
          <MemberResults
            numRep={numberRepresentatives}
            representative={first_rep}
            section={1}
          />
        </div>
        <div className="section block section-two">
          <TextButton
            text="Back"
            onClick={this._goBack}
          />
          <MemberResults
            numRep={numberRepresentatives}
            representative={second_rep}
            section={2}
          />
        </div>
      </div>
    );
  }
}

export default Results;
