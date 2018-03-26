import * as React from 'react';
import * as cx from 'classnames';

// Components
import TextButton from '../Buttons/TextButton';
import MemberResults from '../MemberResults';
import { Contribution } from '../../models/Contribution';
import {
  Legislator,
  Record as LegislatorRecord,
} from '../../models/Legislator';

export interface StateProps {
  didSearch?: boolean;
}

export interface DispatchProps {
  onBack?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface Props extends StateProps, DispatchProps {
  contributions: Array<Contribution>;
  representatives: Array<LegislatorRecord>;
}

export class Results extends React.Component<Props> {
  static defaultProps = {
    didSearch: false,
    contributions: [],
    representatives: [],
    onBack: () => undefined,
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
    const firstRep = legislators.filter(rep => getAmount(rep) > 0);
    const secondRep = legislators.filter(rep => getAmount(rep) === 0);
    const sections = [firstRep, secondRep]
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
