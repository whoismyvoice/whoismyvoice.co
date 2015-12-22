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
          The data on this website is based on the data released in March 2015 by the Federal Election Commission on donations that were made during the 2014 election cycle.<br /><br />
          On December 3, 2015, the Senate once again voted down two amendments on gun control, just one day following the San Bernadino, California attacks. Senate Amendment (S.A) 2910 was a measure to provide responsible, consistent, universal background checks for gun purchases, and to ensure individuals listed in the National Instant Criminal Background Check System cannot buy a gun. This amendment included the same language as H.R 1076 which was voted down by Senate in April of 2013. Between April 2013 and December 2015, not one Senator changed their vote. Senate Amendment (S.A) 2908 was a measure to deny people on a federal terrorism watch list (a.k.a "the no-fly" list) the ability to purchase guns.<br /><br />
          Despite 12,472 deaths and 25,156 injuries from gun violence in 2015, 12/3/15 was the first time any gun control measures whatsoever made it to the floor for a vote. In the case of the two amendments above, they only made it to vote because they were attached as amendments to the budget bill. (Data taken from <a href="http://www.gunviolencearchive.org/" target="_blank">The Gun Violence Archive</a>).<br /><br />
        </p>
      </div>
    </div>;
  }
}

export default Sources;
