import React, { Component } from 'react';

// Components
import FadedBG from '../../components/FadedBg';

class Sources extends Component {
  render() {
    return (
      <div className="page-block light-white">
        <FadedBG color="white" />
        <div className="page-wrapper">
          <h2>Sources</h2>
          <p className="page-introduction">
            The data on this website is based on the data released by the
            Federal Election Commission (FEC) on donations that were made during
            the 2015-2016 and 2017-2018 election cycles. Only donations
            exceeding $200 in value are required to be publicly disclosed, i.e.
            (multiple) donations below $200 threshold do not need to be
            itemized. WhoIsMyVoice.com uses APIs provided by{' '}
            <a href="https://maplight.org/">MapLight</a> to search FEC data.
            <br />
            <br />
            On December 3, 2015, the Senate voted down two amendments on gun
            control, just one day following the San Bernadino, California
            attacks. Senate Amendment (S.A) 2910 was a measure to provide
            responsible, consistent, universal background checks for gun
            purchases, and to ensure individuals listed in the National Instant
            Criminal Background Check System cannot buy a gun. This amendment
            included the same language as H.R 1076 which was voted down by
            Senate in April of 2013. Between April 2013 and December 2015, not
            one Senator changed their vote. Senate Amendment (S.A) 2908 was a
            measure to deny people on a federal terrorism watch list (a.k.a "the
            no-fly" list) the ability to purchase guns.
            <br />
            <br />
            Despite 12,472 deaths and 25,156 injuries from gun violence in 2015,
            12/3/15 was the first time any gun control measures whatsoever made
            it to the floor for a vote. In the case of the two amendments above,
            they only made it to vote because they were attached as amendments
            to the budget bill. (Data taken from{' '}
            <a
              href="http://www.gunviolencearchive.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Gun Violence Archive
            </a>).
          </p>
        </div>
      </div>
    );
  }
}

export default Sources;
