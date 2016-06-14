import React from 'react';

// Components
import BaseComponent from './BaseComponent';
import FadedBG from './FadedBg';
import CornerRibbon from './CornerRibbon';

class About extends BaseComponent {
  componentDidMount() {
    $(document).scrollTop(0);
  }
  render() {
    return <div className="page-block light-white">
      <CornerRibbon />
      <FadedBG color="white" />
      <div className="page-wrapper">
        <h2>About</h2>
        <p className="page-introduction">
          This website is unaffiliated with any government or lobbying party or entity, nor is it represented by a media outlet. Its objective is to provide easy access to comprehensive, actionable data to constituents who have a desire to better understand & reach the decision makers who represent them.
          <br /><br />
		      This website was created as a proactive, in-house exercise by the team at Siberia.
		      <br /><br />
		      Please send any comments or fact checking <a href="mailto:&#113;&#117;&#101;&#115;&#116;&#105;&#111;&#110;&#115;&#064;&#119;&#104;&#111;&#105;&#115;&#109;&#121;&#118;&#111;&#105;&#099;&#101;&#046;&#099;&#111;&#109;?Subject=WhoIsMyVoice.com Question" className="strike-out">here</a>.
		      <br /><br />
		      Please send any business or media inquiries <a href="mailto:&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;&#119;&#104;&#111;&#105;&#115;&#109;&#121;&#118;&#111;&#105;&#099;&#101;&#046;&#099;&#111;&#109;?Subject=WhoIsMyVoice.com Contact" className="strike-out">here</a>.<br /><br />
          <a href="http://siberia.io" target="_blank">
            <img src={require('../img/siberia_logo.png')} width="40" />
          </a>
        </p>
      </div>
    </div>;
  }
}

export default About;
