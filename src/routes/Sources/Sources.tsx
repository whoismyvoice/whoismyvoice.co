import React, { VFC } from 'react';

import FadedBG from '../../components/FadedBg';
import { ElectionCycle } from '../../models/ElectionCycle';
import '../../styles/Sources.scss';

interface Props {
  cycles: ElectionCycle[];
}

export const Sources: VFC<Props> = (props) => {
  const { cycles } = props;
  const cycleMessage = cycles.map((cycle) => cycle.label).join(' and ');
  return (
    <div className="page-block light-white">
      <FadedBG color="white" />
      <div className="page-wrapper page-wrapper--sources">
        <h2>Sources</h2>
        <p className="page-introduction">
          The data on this website is based on the data released by the Federal
          Election Commission (FEC) on donations that were made during the{' '}
          {cycleMessage} election cycles. Only donations exceeding $200 in value
          are required to be publicly disclosed, i.e. (multiple) donations below
          $200 threshold do not need to be itemized.
        </p>
        <p>
          whoismyvoice.co uses APIs provided by{' '}
          <a href="https://www.opensecrets.org">
            OpenSecrets and the Center for Responsive Politics
          </a>{' '}
          to search FEC data and the{' '}
          <a href="https://developers.google.com/civic-information">
            Google Civic Information API
          </a>{' '}
          to lookup representatives by address. Current legislator information
          from the Google Civic Information API is matched up with information
          from{' '}
          <a href="https://theunitedstates.io">the @unitedstates project</a> and
          raw member data from the{' '}
          <a href="http://clerk.house.gov/xml/lists/MemberData.xml">House</a>{' '}
          and{' '}
          <a href="http://www.senate.gov/general/contact_information/senators_cfm.xml">
            Senate
          </a>
          .
        </p>
        <p>
          This project was originally focused on highlighting the influx of
          money from a specific organizations, the National Rifle Association.
          The resources relevant to that original focus on gun violence are
          included below for reference. While gun violence remains an important
          issue to many, as{' '}
          <a href="https://www.opensecrets.org/news/2020/10/cost-of-2020-election-14billion-update">
            political spending reaches record numbers
          </a>{' '}
          it has become more important to highlight all the money flowing into
          politics.
        </p>
        <h3>For More Information on Gun Violence</h3>
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
};

export default Sources;
