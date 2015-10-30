import React from 'react'
import { Link } from 'react-router'
import ArrowDown from './ArrowDown'
import WhiteBorder from './WhiteBorder'

const About = React.createClass({
  componentDidMount: function() {
    $(document).scrollTop(0);
  },
  
  render() {
    return <div className="page-block bright-red">
      <div className="black-top-line"></div>
      <WhiteBorder />
      <p className="pageIntroduction">
      	This website is unaffiliated with any government party or entity, nor are we a media outlet. Its objective is to provide comprehensive,
        actionable data to constituents who have a desire to better understand and contact the decision makers representing them.
      	<br /><br />
		    This website was created as a proactive in-house exercise by the team at Siberia.
		    <br /><br />
		    Please send any comments or fact checks <Link className="strike-out" to="#">here</Link>.
		    <br /><br />
		    Please send any Business or Media inquiries <Link className="strike-out" to="#">here</Link>.
      </p>
    </div>;
  }
});

export default About;
