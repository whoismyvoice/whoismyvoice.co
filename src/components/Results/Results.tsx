import * as React from 'react';

// Components
import TextButton, { Props as TextButtonProps } from '../Buttons/TextButton';
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
  onBack?: React.MouseEventHandler<HTMLElement>;
  onNext?: React.MouseEventHandler<HTMLElement>;
}

export interface Props extends StateProps, DispatchProps {
  contributions: Array<Contribution>;
  representatives: Array<LegislatorRecord>;
}

export class Results extends React.Component<Props> {
  static defaultProps: Props = {
    didSearch: false,
    contributions: [],
    representatives: [],
    onBack: () => undefined,
    onNext: () => undefined,
  };

  getButtonProps(index: number): Pick<TextButtonProps, 'link' | 'onClick'> {
    const { onBack, onNext } = this.props;
    const link = `#section-${index}`;
    return index === 0 ? { link, onClick: onBack } : { link, onClick: onNext };
  }

  render(): JSX.Element {
    const { contributions, onNext, representatives } = this.props;
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
          className="section-block"
          id={`section-${index + 1}`}
        >
          <MemberResults
            contributions={contributions}
            legislators={partition}
            onNext={onNext}
            section={index + 1}
          />
        </div>
      ));

    return <React.Fragment>{sections}</React.Fragment>;
  }
}
