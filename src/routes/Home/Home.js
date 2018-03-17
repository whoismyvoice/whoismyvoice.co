import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import mixpanel from 'mixpanel-browser';

import { HOME_ROUTE } from '../../constants/mixpanel-events';

// Components
import Results from '../../components/Results';
import SearchGroup from '../../components/Search/SearchGroup';
import StarTitle from '../../components/StarTitle';
import { PropType as ContributionType } from '../../models/Contribution';
import { PropType as LegislatorType } from '../../models/Legislator';
// Constants
import { ORGANIZATION, ORGANIZATION_DISPLAY } from '../../constants';
// Assets
import '../../styles/Home.css';

export class Home extends Component {
  static propTypes = {
    didSearch: PropTypes.bool,
    numberHouse: PropTypes.number,
    numberRepresentatives: PropTypes.number,
    contributions: PropTypes.arrayOf(ContributionType),
    representatives: PropTypes.arrayOf(LegislatorType),
  };

  componentDidMount() {
    mixpanel.track.apply(mixpanel, HOME_ROUTE);
  }

  render() {
    const {
      didSearch,
      numberHouse,
      numberRepresentatives,
      contributions,
      representatives,
    } = this.props;

    const blockClasses = cx(['block', 'block--margin'], {
      disappear: didSearch && numberHouse === 1 && numberRepresentatives > 2,
    });

    const fadingClasses = cx(['fading-circle'], {
      'orange-bg': didSearch && numberHouse === 1 && numberRepresentatives > 2,
    });

    const containerClasses = cx(
      ['container'],
      { reveal: didSearch },
      { full: didSearch && numberHouse === 1 && numberRepresentatives > 2 }
    );

    const templateString = `Did my representatives accept campaign contributions <span class="strike-out">from <%= organizationName %>?</span>`;
    const templateData = { organizationName: ORGANIZATION_DISPLAY };
    return (
      <div className={containerClasses}>
        <div className={fadingClasses} />
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
            didSearch={didSearch}
            contributions={contributions}
            representatives={representatives}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { address, contributions, officials } = state;
  const organizationContributions =
    contributions.byOrganization[ORGANIZATION] || [];
  return {
    didSearch: address.value !== undefined,
    numberRepresentatives: officials.ids.length,
    numberHouse: officials.ids.length - 2,
    contributions: organizationContributions,
    representatives: officials.ids
      .map(id => officials.byId[id])
      .filter(rep => !!rep),
  };
}

export default connect(mapStateToProps)(Home);
