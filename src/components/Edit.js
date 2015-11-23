import React from 'react';
import request from 'superagent';
import cx from 'classnames';
import SenateActions from '../actions/SenateActions';

// Components
import BaseComponent from './BaseComponent';
import FadedBG from './FadedBg';
import EditInput from './Edit/EditInput';
import EditTextArea from './Edit/EditTextArea';
import EditDropdown from './Edit/EditDropdown';

class Edit extends BaseComponent {
  constructor() {
    super();
    this._bind(
      '_onSelect',
      '_onSelectChamber',
      '_onChangeID',
      '_onChangeBillTitle',
      '_onChangeBillDesc',
      '_onChangeImpactText',
      '_onChangePretext',
      '_onChangeVotedFor',
      '_onChangeVotedAgainst',
      '_handleClick'
    );

    this.state = {
      id: 1,
      bill_id: '',
      bill_title: '',
      bill_desc: '',
      vote_favor: '',
      chamber: '',
      impact_text: '',
      pre_text: '',
      voted_for: '',
      voted_against: ''
    }
  }

  _onSelect(option) {
    this.setState({vote_favor: option.value});
  }
  _onSelectChamber(option) {
    this.setState({chamber: option.value});
  }
  _onChangeID(evt) {
    this.setState({bill_id: evt.target.value});
  }
  _onChangeBillTitle(evt) {
    this.setState({bill_title: evt.target.value});
  }
  _onChangeBillDesc(evt) {
    this.setState({bill_desc: evt.target.value});
  }
  _onChangeImpactText(evt) {
    this.setState({impact_text: evt.target.value});
  }
  _onChangePretext(evt) {
    this.setState({pre_text: evt.target.value});
  }
  _onChangeVotedFor(evt) {
    this.setState({voted_for: evt.target.value});
  }
  _onChangeVotedAgainst(evt) {
    this.setState({voted_against: evt.target.value});
  }

  _handleClick() {
    request
    .post('api/settings/edit')
    .send({
      id: 1,
      bill_id: this.state.bill_id,
      bill_title: this.state.bill_title,
      bill_desc: this.state.bill_desc,
      vote_favor: this.state.vote_favor,
      chamber: this.state.chamber,
      created_at: Date.now(),
      pre_text: this.state.pre_text || 'Pre-text is not defined',
      impact_text: this.state.impact_text || 'Impact is not defined',
      voted_for: this.state.voted_for || 'Single voted for is not defined',
      voted_against: this.state.voted_against || 'Single voted against is not defined'
    })
    .set('Accept', 'application/json')
    .end((err, res) => {
      if(err) return console.error(err);
      SenateActions.flush('settings');
    });
  };

  render() {
    const senateFields = cx(
      ['form-fields'],
      {'hide': this.state.chamber === '' || this.state.chamber === '0'}
    );

    const buttonClasses = cx(
      ['button'],
      {'disabled': this.state.chamber === ''})

    const VoteOptions = [
      { value: '1', label: 'Yea'},
      { value: '0', label: 'Nay'}
    ];

    const ChamberOptions = [
      {value: '1', label: 'Senate'},
      {value: '0', label: 'House'}
    ];

    let defaultOption = this.state.selected;

  	return <div className="page-block edit">
      <FadedBG color="orange-color" />
      <div className="card">
        <h2>Bill details</h2>
        <EditInput
          onChange={this._onChangeID}
          value={this.state.bill_id}
          example="s1881-114"
          placeholder="Enter bill id"
        />
        <EditInput
          onChange={this._onChangeBillTitle}
          value={this.state.bill_title}
          example="Accurate Food Labeling Act of 2015"
          placeholder="Enter bill title"
        />
        <EditInput
          onChange={this._onChangeBillDesc}
          note="Note: Use tag #member to be replaced by senator/congressman"
          value={this.state.bill_desc}
          example="Did my #member vote against the Safe and Accurate Food Labeling Act of 2015?"
          placeholder="Question of the bill (shown on the front page)"
          className="long"
        />
      </div>

      <div className="card">
        <EditDropdown
          title="Select Chamber"
          options={ChamberOptions}
          onChange={this._onSelectChamber}
          placeholder="Select a chamber"
        />
      </div>
      <div className="card">
        <h2>Result texts</h2>
        The text shown on the result page is a combination of: "<b>[pre-text] [vote]</b>".
        <br />E.g. [Your Congressman, Name Nameson voted to] [reverse Obamacare]
        <br /><br />
        <EditInput
          onChange={this._onChangePretext}
          note={'Note: You can use tags: #member_type, #member_name #action'}
          value={this.state.cosponsor_post_text}
          example="Your Congressman/Senator, Name Nameson voted to/co-sponsored"
          placeholder="Pre-text "
          className="long"
        />
        <EditInput
          onChange={this._onChangeVotedFor}
          value={this.state.voted_for}
          example="reverse Obamacare"
          placeholder="Voted for text shown after pre-text"
          className="long"
        />
        <EditInput
          onChange={this._onChangeVotedAgainst}
          value={this.state.voted_against}
          example="not reverse Obamacare"
          placeholder="Voted against text shown after pre-text"
          className="long"
        />
        <EditTextArea
          placeholder="Text shown on the third (action) page enticing users to tweet, call and email"
          note="Note: Use tag #gender_third to add senators gender as him or her."
          onChange={this._onChangeImpactText}
          example="Here are some ways you can keep #gender_third from being able to personally weigh in on safe and accurate food labeling the next time a similar vote comes up."
        />
      </div>

      <div className={senateFields}>
        <div className="card">
          <EditDropdown
            title="Vote in favor?"
            note="Note: One vote is put in favor in order to only show senators who have voted against the vote."
            options={VoteOptions}
            onChange={this._onSelect}
            placeholder="Select an option"
          />
        </div>
      </div>
      <button className={buttonClasses} onClick={this._handleClick}>Save changes</button>
    </div>;
  }
};

export default Edit;
