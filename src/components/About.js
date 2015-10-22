import React from 'react'
import { Link } from 'react-router'

const About = React.createClass({
  render() {
    return <div className="page-block bright-red">
      <p className="pageIntroduction">
      	This website is unaffiliated with any government party or entity, nor are we a media outlet. Its objective is to provide comprehensive, actionable data to constituents who have a desire to better understand and contact the decision makers representing them.
      	<br /><br /> 
		    This website was created as a proactive in-house exercise by employees of Siberia, a global design and engineering firm. 
		    <br /><br />
		    Please send any comments or fact checks <Link className="strike-out" to="#">here</Link>.
		    <br /><br />
		    Please send any Business or Media inquiries <Link className="strike-out" to="#">here</Link>. 
      </p>
    </div>;
  }
});

export default About;
