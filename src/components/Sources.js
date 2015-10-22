import React from 'react';
import { Link } from 'react-router';

const Sources = React.createClass({
  render() {
    return  <div className="page-block bright-green">
      <p className="pageIntroduction">
      	Every senator listed on this website is a listed co-sponsor of Senate Bill 1881. Senate Bill 1881 is a "bill to prohibit the federal funding of the Planned Parenthood Federation of America". (1)<br /><br />
      	The Congressmen listed on this website are the listed members of the House Freedom Caucus, who issued a press release via Congressman Jim Jordan on September 10, 2015:
      	<br /><br />
      	"Given the appalling revelations surrounding Planned Parenthood, we cannot in good moral conscience vote to send taxpayer money to this organization while still fulfilling our duty to represent our constituents. We must therefore oppose any spendig measure that contains funding for Planned Parenthood."
      	<br /><br />
      	<span className="resources">
      		Additional resource data was pulled directly from the following sources:
			<br />
      		1) <Link to="http://jordan.house.gov/news/documentsingle.aspx?DocumentID=397949">Congressman Jim Jordan's Press Release</Link><br />
			2) <Link to="https://www.congress.gov/bill/114th-congress/senate-bill/1881">Senate Bill S.1881</Link><br />
			3) <Link to="http://sunlightfoundation.com/">Sunlight Foundation </Link>
		</span>
      </p>
    </div>;
  }
});

export default Sources;
