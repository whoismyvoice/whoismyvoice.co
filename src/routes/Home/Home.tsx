import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import * as mixpanel from 'mixpanel-browser';

// Components
import Results from '../../components/Results';
import SearchGroup from '../../components/SearchGroup';
import { StarTitle } from '../../components/Title/StarTitle';
import { Contribution } from '../../models/Contribution';
import { Record as LegislatorType } from '../../models/Legislator';
import { State } from '../../store';
import { Dispatch } from '../../actions/types';
// Constants
import { ORGANIZATION, ORGANIZATION_DISPLAY } from '../../constants';
import { HOME_ROUTE } from '../../constants/mixpanel-events';
// Assets
import '../../styles/Home.scss';

interface Props {
  currentPage?: 1 | 2;
  didSearch: boolean;
  numberHouse: number;
  numberRepresentatives: number;
  contributions: Array<Contribution>;
  representatives: Array<LegislatorType>;
}

export function Home(props: Props): JSX.Element {
  useEffect(() => {
    mixpanel.track(...HOME_ROUTE);
  }, []);
  const {
    currentPage,
    didSearch,
    numberHouse,
    numberRepresentatives,
    contributions,
    representatives,
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

  // tslint:disable
  const templateString = `Did my representatives accept campaign contributions <span class="strike-out">from <%= organizationName %>?</span>`;
  // tslint:enable
  const templateData = { organizationName: ORGANIZATION_DISPLAY };
  return (
    <div className={containerClasses}>
      <div className="overlay">
        This site is only supported in portrait mode. Please turn your phone.
      </div>
      <div className={blockClasses}>
        <div className="section-block">
          <StarTitle
            templateData={templateData}
            templateString={templateString}
          />
          <SearchGroup />
        </div>
        <Results
          contributions={contributions}
          representatives={representatives}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state: State): Props {
  const { address, contributions, officials, view } = state;
  const organizationContributions =
    contributions.byOrganization[ORGANIZATION] || [];
  return {
    currentPage: view.currentPage,
    didSearch: address.value !== undefined,
    numberRepresentatives: officials.legislators.length,
    numberHouse: officials.legislators.length - 2,
    contributions: organizationContributions,
    representatives: officials.legislators,
  };
}

function mapDispatchToProps(dispatch: Dispatch): {} {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
