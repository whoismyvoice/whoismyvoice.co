import React, { VFC } from 'react';

// Components
import ContactButtonSmall from './../Buttons/ContactButtonSmall';
import { Legislator } from '../../models/Legislator';

// Styles
import './../../styles/ActionButtons.scss';

interface Props {
  legislator: Legislator;
}

export const ActionButtons: VFC<Props> = (props) => {
  const { legislator } = props;
  // Define each value used for every member
  const { genderPronoun, phone } = legislator;
  return (
    <div className="actionButtons">
      <ContactButtonSmall
        link={`tel:${phone}`}
        icon="phone"
        text={`Call ${genderPronoun}`}
      />
      <TwitterActionButton legislator={legislator} />
    </div>
  );
};

const TwitterActionButton: VFC<Props> = (props) => {
  const { legislator } = props;
  const { genderPronoun } = legislator;
  const twitterLink = getTwitterLink(legislator);
  return twitterLink === undefined ? (
    <React.Fragment />
  ) : (
    <ContactButtonSmall
      link={twitterLink}
      icon="twitter"
      text={`Tweet at ${genderPronoun}`}
    />
  );
};

const getTwitterLink = (legislator: Legislator): string | undefined => {
  const username = legislator.twitter;
  return username === undefined
    ? undefined
    : `https://twitter.com/intent/tweet?hashtags=WhoIsMyVoice&text=@${username}`;
};

export default ActionButtons;
