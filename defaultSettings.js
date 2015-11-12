const defaultSettings = {
  bill_id: 'hr1599-114',
  bill_title: 'Safe and Accurate Food Labeling Act of 2015',
  bill_desc: 'Did my #member vote against the Safe and Accurate Food Labeling Act of 2015?',
  vote_favor: 'Yea',
  chamber: 'house',
  senate: {
    impact_text: 'Here are some ways you can keep #gender_third from being able to personally weigh in on safe and accurate food labeling the next time a similar vote comes up.',
    no_cosponsor_title: 'No! Your senators support Planned Parenthood! ',
    no_cosponsor_desc: 'But have you heard of the House Freedom Caucus? The HFC is a group of 40+ conservative congressmen who have publicly declared they will oppose any spending bill that does not defund Planned Parenthood. Yes, these men and women are willing to shut down your government over this issue. If you live in their district, email them. If you don’t, tweet at them.',
    cosponsor_post_text: 'co-sponsored the bill to defund Planned Parenthood.',
    represent: '#gender represents your voice!'
  },
  house: {
    single_voted_for: 'voted for the Safe and Accurate Food Labeling Act of 2015. ',
    single_voted_against: 'voted against the Safe and Accurate Food Labeling Act of 2015. ',
    multiple_results: 'These people represent a congressional district in your area'
  }
};

export default defaultSettings;
