import React, { FC } from 'react';

// Components
import TextButton from '../Buttons/TextButton';
import MemberResults from '../MemberResults';
import { SectorContributions } from '../../models/Contribution';
import {
  BioguideId,
  Legislator,
  Record as LegislatorRecord,
} from '../../models/Legislator';

export interface StateProps {
  didSearch?: boolean;
}

export interface DispatchProps {
  onBack?: React.MouseEventHandler<HTMLElement>;
}

export interface Props extends StateProps, DispatchProps {
  representatives: Array<LegislatorRecord>;
  sectorContributions: Record<BioguideId, SectorContributions>;
}

export const Results: FC<Props> = (props: Props) => {
  const { representatives, sectorContributions } = props;
  if (representatives.length === 0) {
    return <React.Fragment />;
  }
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
        data-testid={`result-section-${index + 1}`}
      >
        <MemberResults
          allLegislators={legislators}
          legislators={partition}
          sectorContributions={sectorContributions}
        />
      </div>
    ));

  return (
    <React.Fragment>
      <TextButton
        text="Search Another Zip Code"
        link="#section-0"
        onClick={props.onBack}
      />
      {sections}
    </React.Fragment>
  );
};
