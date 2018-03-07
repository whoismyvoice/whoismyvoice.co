import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
import cx from 'classnames';

// Components
import CornerRibbon from '../../components/CornerRibbon';
import Results from '../../components/Results';
import SearchGroup from '../../components/Search/SearchGroup';
import TitleComponent from '../../components/TitleComponent';

// Assets
import '../../styles/Home.css';

export class Home extends Component {
  static propTypes = {
    didSearch: PropTypes.bool,
    numberHouse: PropTypes.number,
    numberRepresentatives: PropTypes.number,
  }

  render() {
    const {
      didSearch,
      numberHouse,
      numberRepresentatives,
    } = this.props;

    const blockClasses = cx(
      ['block', 'block--margin'],
      {'disappear': didSearch && numberHouse === 1 && numberRepresentatives > 2},
    );

    const fadingClasses = cx(
      ['fading-circle'],
      {'orange-bg': didSearch && numberHouse === 1 && numberRepresentatives > 2}
    );

    const containerClasses = cx(
      ['container'],
      {'reveal': didSearch},
      {'full': didSearch && numberHouse === 1 && numberRepresentatives > 2}
    );

    return (
      <div className={containerClasses}>
        <CornerRibbon
          didSearch={didSearch}
         />

        <div className={fadingClasses}></div>
        <div className="overlay">
          This site is only supported in portrait mode. Please turn your phone.
        </div>
        <div className={blockClasses}>
        	<div className="section-block">
            <TitleComponent
              front={true}
              classes="title-component--padding"
              desc={true}
            />
          	<SearchGroup />
          </div>
          <Results destroy={this._destroyFullpage} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { address, officials, } = state;
  return {
    didSearch: address.value !== undefined,
    numberRepresentatives: officials.ids.length,
    numberHouse: officials.ids.length - 2,
    representatives: officials.ids.map(id => officials.byId[id]),
  };
}

export default connect(mapStateToProps)(Home);