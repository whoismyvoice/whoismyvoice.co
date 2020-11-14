import * as React from 'react';

// Components
import TextButton, { Props as TextButtonProps } from '../Buttons/TextButton';
import MemberResults from '../MemberResults';
import { SectorContributions } from '../../models/Contribution';
import {
  BioguideId,
  Legislator,
  Record as LegislatorRecord,
} from '../../models/Legislator';

export interface StateProps {
  didSearch?: boolean;
  sectors: string[];
}

export interface DispatchProps {
  onBack?: React.MouseEventHandler<HTMLElement>;
}

export interface Props extends StateProps, DispatchProps {
  representatives: Array<LegislatorRecord>;
  sectorContributions: Record<BioguideId, SectorContributions>;
}

export class Results extends React.Component<Props> {
  static defaultProps: Props = {
    didSearch: false,
    sectors: [],
    representatives: [],
    sectorContributions: {},
    onBack: () => undefined,
  };

  getButtonProps(index: number): Pick<TextButtonProps, 'link' | 'onClick'> {
    const { onBack } = this.props;
    const link = `#section-${index}`;
    return index === 0 ? { link, onClick: onBack } : { link };
  }

  render(): JSX.Element {
    const { representatives, sectors, sectorContributions } = this.props;
    if (representatives.length === 0) {
      return <React.Fragment />;
    }
    const calcButtonProps = this.getButtonProps.bind(this);
    const legislators = representatives.map((rep) => new Legislator(rep));
    const firstRep = legislators.filter((rep) => rep.isSenator);
    const secondRep = legislators.filter((rep) => rep.isRepresentative);
    const sections = [firstRep, secondRep]
      .filter((partition) => partition.length > 0)
      .map((partition, index) => (
        <div
          key={partition.map((legislator) => legislator.identifier).join('')}
          className="section-block"
          id={`section-${index + 1}`}
        >
          <MemberResults
            allLegislators={legislators}
            legislators={partition}
            sectors={sectors}
            sectorContributions={sectorContributions}
          />
        </div>
      ));

    return (
      <React.Fragment>
        <TextButton text="Search Another Zip Code" {...calcButtonProps(0)} />
        {sections}
      </React.Fragment>
    );
  }
}
