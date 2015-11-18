import React from 'react';
import request from 'superagent';
import cx from 'classnames';

// Components
import BaseComponent from './BaseComponent';
import SenateActions from '../actions/SenateActions';
import Dropdown from 'react-dropdown';

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
    console.log(this.state.bill_id);
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
    this.setState({no_cosponsor_text: evt.target.value});
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
      { value: '1', label: 'Senate'},
      {value: '0', label: 'House'}
    ];

    let defaultOption = this.state.selected;

  	return <div className="page-block edit">
      <div className="card">
        <b>Bill ID</b>
        <div className="example">
          s1881-114
        </div>
        <input
          type="text"
          placeholder="Enter bill id"
          onChange={this._onChangeID}
          value={this.state.bill_id}
        />

        <b>Bill Title</b>
        <div className="example">
          Accurate Food Labeling Act of 2015
        </div>
        <input
          type="text"
          placeholder="Enter bill title"
          onChange={this._onChangeBillTitle}
          value={this.state.bill_title}
        />

        <b>Bill Question</b><br />
        <i>Note: Use tag #member to be replaced by senator/representative</i>
        <div className="example">
          Did my #member vote against the Safe and Accurate Food Labeling Act of 2015?
        </div>
        <input
          type="text"
          placeholder="Enter bill question"
          onChange={this._onChangeBillDesc}
          value={this.state.bill_desc}
        />
      </div>

      <div className="card">
        <b>Select chamber</b>
        <Dropdown
          options={ChamberOptions}
          onChange={this._onSelectChamber}
          placeholder="Select a chamber"
        />
      </div>

      <div className={senateFields}>
        <div className="card">
          <b>Vote in favor?</b><br />
          <i>Note: One vote is put in favor in order to only show senators who have voted against the vote.</i>
          <Dropdown
            options={VoteOptions}
            onChange={this._onSelect}
            placeholder="Select an option"
          />
        </div>

        <div className="card">
          <b>Title shown when no senator within zip-code is a co-sponsor</b>
          <div className="example">
            No! Your senators support Planned Parenthood!
          </div>
          <input
            type="text"
            placeholder="No co-sponsor title"
            onChange={this._onChangeNoCosponsor}
          />

          <b>Text shown below title defined above</b>
          <div className="example">
            But have you heard of the House Freedom Caucus? The HFC is a group of 40+ conservative congressmen who have publicly declared they will oppose any spending bill that does not defund Planned Parenthood. Yes, these men and women are willing to shut down your government over this issue. If you live in their district, email them. If you don’t, tweet at them.
          </div>
          <input
            type="text"
            placeholder="No co-sponsor text"
            onChange={this._onChangeNoCosponsorDesc}
          />
        </div>

        <div className="card">
          <b>Text shown after senator details</b><br />
          <i>Senator details: "Yes! Your senator a [age] year old [gender]"</i>
          <div className="example">
            co-sponsored the bill to defund Planned Parenthood.
          </div>
          <input
            type="text"
            placeholder="Co-sponsor text"
            onChange={this._onChangeCosponsorText}
          />

          <b>Final sentence following senator details and text</b><br />
          <i>Note: Use tag #gender to be replaced by the senators gender.</i>
          <div className="example">
            #gender represents your voice!
          </div>
          <input
            type="text"
            placeholder="Final sentence"
            onChange={this._onChangeRepresentText}
          />

          <b>Text shown on action page enticing users to do something</b><br />
          <i>Note: Use tag #gender_third to add senators gender as him or her.</i>
          <div className="example">
            Here are some ways you can keep #gender_third from being able to personally weigh in on safe and accurate food labeling the next time a similar vote comes up.
          </div>
          <input
            type="text"
            placeholder="Action page text"
            onChange={this._onChangeImpactText}
          />
        </div>
      </div>

      <div className={houseFields}>
        <div className="card">
          <b>Text shown for representative who voted for bill following representative details.</b><br />
          <i>Representative details: "Yes! Your Representative, a [age] year old [gender]"</i>
          <div className="example">
            voted for the Safe and Accurate Food Labeling Act of 2015.
          </div>
          <input
            type="text"
            placeholder="Voted for bill text"
            onChange={this._onChangeVotedFor}
          />

          <b>Text shown for representative who voted against bill following representative details.</b>
          <i>Representative details: "No! Your Representative, a [age] year old [gender]"</i>
          <div className="example">
            voted against the Safe and Accurate Food Labeling Act of 2015.
          </div>
          <input
            type="text"
            placeholder="Voted against bill text"
            onChange={this._onChangeVotedAgainst}
          />
        </div>
      </div>
      <button className={buttonClasses} onClick={this._handleClick}>Save changes</button>
    </div>;
  }
};

export default Edit;
