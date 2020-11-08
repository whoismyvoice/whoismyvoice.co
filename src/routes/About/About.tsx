import * as React from 'react';

// Components
import FadedBG from '../../components/FadedBg';

// Assets
import '../../styles/About.scss';
import siberiaLogo from '../../img/siberia_logo.png';

class About extends React.Component {
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
              href="mailto:q%75est&#105;%6f&#110;&#115;@w%68o%69s%6dyvoice%2e%63o?subject=whoismyvoivce.co%20Question"
              className="strike-out"
            >
              questions [at] whoismyvoice [dot] co
            </a>
            .
            <br />
            <br />
            Please send any business or media inquiries{' '}
            <a
              href="mailto:%63onta%63%74%40w%68%6fi%73%6d%79%76&#111;i%63%65&#46;%63&#111;?subject=whoismyvoivce.co%20Inquiry"
              className="strike-out"
            >
              contact [at] whoismyvoice [dot] co
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
