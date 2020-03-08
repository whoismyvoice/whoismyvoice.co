import * as React from 'react';
import * as mixpanel from 'mixpanel-browser';

import { ABOUT_ROUTE } from '../../constants/mixpanel-events';

// Components
import FadedBG from '../../components/FadedBg';

// Assets
import '../../styles/About.scss';
import siberiaLogo from '../../img/siberia_logo.png';

class About extends React.Component {
  componentDidMount(): void {
    mixpanel.track(...ABOUT_ROUTE);
  }

  render(): JSX.Element {
    return (
      <div className="page-block light-white">
        <FadedBG color="white" />
        <div className="page-wrapper">
          <h2>About</h2>
          <p className="page-introduction">
            This website is unaffiliated with any government or lobbying party
            or entity, nor is it represented by a media outlet. Its objective is
            to provide easy access to comprehensive, actionable data to
            constituents who have a desire to better understand & reach the
            decision makers who represent them.
            <br />
            <br />
            This website was created as a proactive, in-house exercise by the
            team at Siberia.
            <br />
            <br />
            Please send any comments or fact checking{' '}
            <a
              href="mailto:&#113;&#117;&#101;&#115;&#116;&#105;&#111;&#110;&#115;&#064;&#119;&#104;&#111;&#105;&#115;&#109;&#121;&#118;&#111;&#105;&#099;&#101;&#046;&#099;&#111;&#109;?Subject=WhoIsMyVoice.com Question"
              className="strike-out"
            >
              here
            </a>
            .
            <br />
            <br />
            Please send any business or media inquiries{' '}
            <a
              href="mailto:&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;&#119;&#104;&#111;&#105;&#115;&#109;&#121;&#118;&#111;&#105;&#099;&#101;&#046;&#099;&#111;&#109;?Subject=WhoIsMyVoice.com Contact"
              className="strike-out"
            >
              here
            </a>
            .<br />
            <br />
            <a
              href="http://siberia.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="Siberia" src={siberiaLogo} width="40" />
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default About;
