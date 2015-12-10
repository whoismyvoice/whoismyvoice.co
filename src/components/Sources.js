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
          <br /><br />
          On December 4, 2015, the Senate voted on H.R 3762, a bill in which Republicans attempted to use the budget reconciliation process to repeal the Affordable Healthcare Act (aka Obamacare) and end federal funding for Planned Parenthood. Budget reconciliation is the one chance each year that the majority (Republican) party gets to bypass the Senate filibuster in order to get a bill to the President's desk, without needing a single vote from the minority (Democrat) party.
          <br /><br />
          <span className="resources">
            Additional resource data was pulled directly from the following sources:
            <br /><br />
            1) <a href="https://api.open.fec.gov/" target="_blank">FEC.gov</a><br />
            2) <a href="http://sunlightfoundation.com/" target="_blank">Sunlight Foundation</a>
		      </span>
        </p>
      </div>
    </div>;
  }
}

export default Sources;
