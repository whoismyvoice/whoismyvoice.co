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
      '_onChangeVoteFavor',
      '_onChangeImpactText',
      '_onChangeNoCosponsor',
      '_onChangeNoCosponsorDesc',
      '_onChangeRepresentText',
      '_onChangeVotedFor',
      '_onChangeVotedAgainst',
      '_onChangeCosponsorText',
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
      no_cosponsor_title: '',
      no_cosponsor_desc: '',
      cosponsor_post_text: '',
      represent: '',
      single_voted_for: '',
      single_voted_against: ''
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
  _onChangeVoteFavor(evt) {
    this.setState({vote_favor: evt.target.value});
  }
  _onChangeImpactText(evt) {
    this.setState({impact_text: evt.target.value});
  }
  _onChangeNoCosponsor(evt) {
    this.setState({no_cosponsor_title: evt.target.value});
  }
  _onChangeNoCosponsorDesc(evt) {
    this.setState({no_cosponsor_desc: evt.target.value});
  }
  _onChangeCosponsorText(evt) {
    this.setState({cosponsor_post_text: evt.target.value});
  }
  _onChangeRepresentText(evt) {
    this.setState({represent: evt.target.value});
  }
  _onChangeVotedFor(evt) {
    this.setState({single_voted_for: evt.target.value});
  }
  _onChangeVotedAgainst(evt) {
    this.setState({single_voted_against: evt.target.value});
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
      senate: {
        impact_text: this.state.impact_text || 'Impact is not defined',
        no_cosponsor_title: this.state.no_cosponsor_title || 'No cosponsor title is not defined',
        no_cosponsor_desc: this.state.no_cosponsor_desc || 'No cosponsor desc is not defined',
        represent: this.state.represent || 'Represent text is not defined'
      },
      house: {
        single_voted_for: this.state.single_voted_for || 'Single voted for is not defined',
        single_voted_against: this.state.single_voted_against || 'Single voted against is not defined',
      }
    })
    .set('Accept', 'application/json')
    .end((err, res) => {
      if(err) return console.error(err);
      SenateActions.flush('settings');
    });
  }

  render() {
    const senateFields = cx(
      ['form-fields'],
      {'hide': this.state.chamber === '' || this.state.chamber === '0'}
    );

    const houseFields = cx(
      ['form-fields'],
      {'hide': this.state.chamber === '' || this.state.chamber === '1'}
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
        <EditInput
          title="Bill ID"
          onChange={this._onChangeID}
          value={this.state.bill_id}
          example="s1881-114"
          placeholder="Enter bill id"
        />
        <EditInput
          title="Bill Title"
          onChange={this._onChangeBillTitle}
          value={this.state.bill_title}
          example="Accurate Food Labeling Act of 2015"
          placeholder="Enter bill title"
        />
        <EditInput
          title="Bill Question"
          onChange={this._onChangeBillDesc}
          note="Note: Use tag #member to be replaced by senator/representative"
          value={this.state.bill_desc}
          example="Did my #member vote against the Safe and Accurate Food Labeling Act of 2015?"
          placeholder="Enter bill question"
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

        <div className="card">
          <EditInput
            title="Title shown when no senator within zip-code is a co-sponsor"
            onChange={this._onChangeNoCosponsor}
            note="Note: Use tag #member to be replaced by senator/representative"
            value={this.state.no_cosponsor_title}
            example="No! Your senators support Planned Parenthood!"
            placeholder="No co-sponsor title"
          />
          <EditTextArea
            title="Text shown below title defined above"
            placeholder="No co-sponsor text"
            onChange={this._onChangeNoCosponsorDesc}
            example="But have you heard of the House Freedom Caucus? The HFC is a group of 40+ conservative congressmen who have publicly declared they will oppose any spending bill that does not defund Planned Parenthood. Yes, these men and women are willing to shut down your government over this issue. If you live in their district, email them. If you don’t, tweet at them."
          />
        </div>
        <div className="card">
          <EditInput
            title="Text shown after senator details"
            onChange={this._onChangeCosponsorText}
            note={'Senator details: "Yes! Your senator a [age] year old [gender]"'}
            value={this.state.cosponsor_post_text}
            example="co-sponsored the bill to defund Planned Parenthood."
            placeholder="Co-sponsor text"
          />
          <EditInput
            title="Final sentence following senator details and text"
            onChange={this._onChangeRepresentText}
            note="Note: Use tag #gender to be replaced by the senators gender."
            value={this.state.represent}
            example="#gender represents your voice!"
            placeholder="Final sentence"
          />
          <EditTextArea
            title="Text shown on action page enticing users to do something"
            placeholder="Action page text"
            note="Note: Use tag #gender_third to add senators gender as him or her."
            onChange={this._onChangeImpactText}
            example="Here are some ways you can keep #gender_third from being able to personally weigh in on safe and accurate food labeling the next time a similar vote comes up."
          />
        </div>
      </div>
      <div className={houseFields}>
        <div className="card">
          <EditInput
            title="Text shown for representative who voted for bill following representative details."
            onChange={this._onChangeVotedFor}
            note={'Representative details: "Yes! Your Representative, a [age] year old [gender]"'}
            value={this.state.single_voted_for}
            example="voted for the Safe and Accurate Food Labeling Act of 2015."
            placeholder="Voted-for bill text"
          />
          <EditInput
            title="Text shown for representative who voted against bill following representative details."
            onChange={this._onChangeVotedAgainst}
            note={'Representative details: "No! Your Representative, a [age] year old [gender]"'}
            value={this.state.single_voted_against}
            example="voted against the Safe and Accurate Food Labeling Act of 2015."
            placeholder="Voted against bill text"
          />
          <EditTextArea
            title="Text shown on action page enticing users to do something"
            placeholder="Action page text"
            note="Note: Use tag #gender_third to add senators gender as him or her."
            onChange={this._onChangeImpactText}
            example="Here are some ways you can keep #gender_third from being able to personally weigh in on safe and accurate food labeling the next time a similar vote comes up."
          />
        </div>
      </div>
      <button className={buttonClasses} onClick={this._handleClick}>Save changes</button>
    </div>;
  }
};

export default Edit;
