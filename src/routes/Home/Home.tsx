import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

// Components
import Results from '../../components/Results';
import SearchGroup from '../../components/SearchGroup';
import { StarTitle } from '../../components/Title/StarTitle';
import { Record as LegislatorType } from '../../models/Legislator';
import { State } from '../../store';
// Assets
import '../../styles/Home.scss';

interface Props {
  currentPage?: 1 | 2;
  didSearch: boolean;
  numberHouse: number;
  numberRepresentatives: number;
  representatives: Array<LegislatorType>;
  sectorContributions: State['contributions']['sectorsByLegislator'];
}

export function Home(props: Props): JSX.Element {
  const {
    currentPage,
    didSearch,
    numberHouse,
    numberRepresentatives,
    representatives,
    sectorContributions,
  } = props;
  useEffect(() => {
    document.body.classList[didSearch ? 'add' : 'remove']('orange-bg');
  }, [didSearch]);

  const blockClasses = cx(['block'], {
    disappear: didSearch && numberHouse === 1 && numberRepresentatives > 2,
    'page-one': currentPage === undefined || currentPage === 1,
    'page-two': currentPage === 2,
  });

  const containerClasses = cx(
    ['container'],
    { reveal: didSearch },
    { full: didSearch && numberHouse === 1 && numberRepresentatives > 2 }
  );

  return (
    <div className={containerClasses}>
      <div className="overlay">
        This site is only supported in portrait mode. Please turn your phone.
      </div>
      <div className={blockClasses}>
        <div className="section-block">
          <StarTitle>
            Learn about who funds the campaigns of
            <br />
            <span className="strike-out">your representatives!</span>
          </StarTitle>
          <SearchGroup />
        </div>
        <Results
          representatives={representatives}
          sectorContributions={sectorContributions}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state: State): Props {
  const { address, contributions, officials, view } = state;
  return {
    currentPage: view.currentPage,
    didSearch: address.value !== undefined,
    numberRepresentatives: officials.legislators.length,
    numberHouse: officials.legislators.length - 2,
    representatives: officials.legislators,
    sectorContributions: contributions.sectorsByLegislator,
  };
}

export default connect(mapStateToProps)(Home);
