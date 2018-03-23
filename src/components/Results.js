// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

// Components
import TextButton from './Buttons/TextButton';
import MemberResults from './MemberResults';
import { PropType as ContributionType } from '../models/Contribution';
import { Legislator, PropType as LegislatorType } from '../models/Legislator';
import { reset } from '../actions';

import type { Dispatch } from '../actions';
import type { ContributionRecord } from '../models/Contribution';
import type { LegislatorRecord } from '../models/Legislator';
import type { State } from '../store';

type Props = {
  backgroundClasses: any,
  destroy: Function,
  didSearch: boolean,
  contributions: Array<ContributionRecord>,
  representatives: Array<LegislatorRecord>,
  onBack: Function,
};

export class Results extends Component<Props> {
  static defaultProps = {
    backgroundClasses: '',
    destroy: () => {},
    didSearch: false,
    contributions: [],
    representatives: [],
    onBack: () => {},
  };

  static propTypes = {
    backgroundClasses: PropTypes.any,
    destroy: PropTypes.func,
    didSearch: PropTypes.bool.isRequired,
    contributions: PropTypes.arrayOf(ContributionType),
    representatives: PropTypes.arrayOf(LegislatorType),
  };

  getButtonProps(index: number) {
    const { onBack } = this.props;
    return index === 0 ? { onClick: onBack } : { link: `#section-${index}` };
  }

  render() {
    const { didSearch, contributions, representatives } = this.props;

    const backgroundClasses = cx(['second-wrapper'], {
      'move-up': didSearch,
    });

    const calcButtonProps = this.getButtonProps.bind(this);
    const legislators = representatives.map(rep => new Legislator(rep));
    const getAmount = Legislator.getContributionAmount.bind(
      this,
      contributions
    );
    const first_rep = legislators.filter(rep => getAmount(rep) > 0);
    const second_rep = legislators.filter(rep => getAmount(rep) === 0);
    const sections = [first_rep, second_rep]
      .filter(partition => partition.length > 0)
      .map((partition, index) => (
        <div
          key={partition.reduce(
            (key, legislator) => key + legislator.identifier,
            ''
          )}
          className="section block"
          id={`section-${index + 1}`}
        >
          <TextButton text="Back" {...calcButtonProps(index)} />
          <MemberResults
            didSearch={didSearch}
            legislators={partition}
            contributions={contributions}
            section={index + 1}
          />
        </div>
      ));

    return (
      <div className={backgroundClasses} id="fullpage">
        {sections}
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  const { address, view } = state;
  return {
    didSearch: address.value !== undefined,
    ...view,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onBack: event => {
      event.preventDefault();
      dispatch(reset());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
