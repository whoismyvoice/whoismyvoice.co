import React from 'react';
import { Link } from 'react-router';

// Components
import BaseComponent from './BaseComponent';
import FadedBG from './FadedBg';

class About extends BaseComponent {
  componentDidMount() {
    $(document).scrollTop(0);
  }
  render() {
    return <div className="page-block light-white">
      <FadedBG color="white" />
      <div className="page-wrapper">
        <h2>About</h2>
        <p className="page-introduction">
          This website is unaffiliated with any government or lobbying party or entity, nor is it represented by a media outlet. Its objective is to provide easy access to comprehensive, actionable data to constituents who have a desire to better understand & reach the decition makers who represent them.
          <br /><br />
		      This website was created as a proactive, in-house exercise by the team at Siberia.
		      <br /><br />
		      Please send any comments or fact checking <Link className="strike-out" to="#">here</Link>.
		      <br /><br />
		      Please send any business or media inquiries <Link className="strike-out" to="#">here</Link>.<br /><br />
          <img src={require('../img/siberia_logo.png')} width="40" />
        </p>
      </div>
    </div>;
  }
}

export default About;
