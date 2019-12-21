import React from 'react';
import * as mixpanel from 'mixpanel-browser';

import { SOURCES_ROUTE } from '../../constants/mixpanel-events';
import FadedBG from '../../components/FadedBg';
import '../../styles/Sources.css';

class Sources extends React.Component {
  componentDidMount() {
    mixpanel.track.apply(mixpanel, SOURCES_ROUTE);
  }

  render() {
    return (
      <div className="page-block light-white">
        <FadedBG color="white" />
        <div className="page-wrapper page-wrapper--sources">
          <h2>Sources</h2>
          <p className="page-introduction">
            The data on this website is based on the data released by the
            Federal Election Commission (FEC) on donations that were made during
            the 2017-2018 and 2019-2020 election cycles. Only donations
            exceeding $200 in value are required to be publicly disclosed, i.e.
            (multiple) donations below $200 threshold do not need to be
            itemized. WhoIsMyVoice.com uses APIs provided by
            <a href="https://maplight.org/">MapLight</a> to search FEC data and
            the
            <a href="https://developers.google.com/civic-information">
              Google Civic Information API
            </a>
            to lookup representatives by address.
          </p>
          <h3>For More Information</h3>
          <ul className="sources">
            <li>
              <a href="https://www.cdc.gov/nchs/pressroom/sosmap/firearm_mortality/firearm.htm">
                CDC Statistics on Firearm Mortality By State
              </a>
            </li>
            <li>
              <a href="http://www.gunviolencearchive.org/">
                The Gun Violence Archive
              </a>
            </li>
            <li>
              <a href="https://everytownresearch.org/">
                Everytown for Gun Safety
              </a>
            </li>
            <li>
              <a href="https://home.nra.org/">National Rifle Association</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sources;
