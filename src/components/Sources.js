import React from 'react';
import { Link } from 'react-router';

// Components
import BaseComponent from './BaseComponent';
import FadedBG from './FadedBg';

class Sources extends BaseComponent {
  componentDidMount() {
    $(document).scrollTop(0);
  }
  render() {
    return  <div className="page-block light-white">
      <FadedBG color="white" />
      <div className="page-wrapper">
        <h2>Sources</h2>
        <p className="page-introduction">
          The data on this website has been lifted directly from the Congress.gov roll call for December 2015, with contact information provided via API's developed by the Sunlight Foundation.<br /><br />
          On December 4, 2015, the Senate voted on H.R 3762, a bill in which Republicans attempted to use the budget reconciliation process to repeal the Affordable Healthcare Act (aka Obamacare) and end federal funding for Planned Parenthood. The budget reconciliation vote is the one chance each year that the majority (Republican) party gets to bypass the Senate filibuster in order to get a bill to the President's desk, without needing a single vote from the minority (Democrat) party. The House previously voted on this same bill on October 23, 2015.<br /><br />
          The Republican congressional representatives listed on this website who belong to the House Freedom Caucus (HFC) have publicly declared their willingness to shut down the U.S. government over the issue of Planned Parenthood funding. On September 10, 2015, Congressman Jim Jordan issued the following press release on behalf of the HFC:<br /><br />
          "Given the appalling revelations surrounding Planned Parenthood, we cannot in good moral conscience vote to send taxpayer money to this organization, while still fulfilling our duty to represent our constituents. We must therefore oppose any spending measure that contains funding for Planned Parenthood."
        </p>
      </div>
    </div>;
  }
}

export default Sources;
