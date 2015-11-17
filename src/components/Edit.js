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
      '_onChangeVotedAgainst'
    );

    this.state = {
      id: 1,
      bill_id: '',
      bill_title: '',
      bill_desc: '',
      vote_favor: '',
      chamber: '',
      impact_text: '',
      no_cosponsor_text: '',
      no_cosponsor_desc: '',
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
    Bill ID
      <input
        type="text"
        placeholder="Enter bill id"
        onChange={this._onChangeID}
        value={this.state.bill_id}
      />

      Bill Title
      <input
        type="text"
        placeholder="Enter bill title"
        onChange={this._onChangeBillTitle}
        value={this.state.bill_title}
      />

      Bill Description
      <input
        type="text"
        placeholder="Enter bill description"
        onChange={this._onChangeBillDesc}
        value={this.state.bill_desc}
      />

      Select chamber
      <Dropdown
        options={ChamberOptions}
        onChange={this._onSelectChamber}
        placeholder="Select a chamber"
      />

      <div className="seperator"></div>

      <div className={senateFields}>
        What vote to put in favor?
        <Dropdown
          options={VoteOptions}
          onChange={this._onSelect}
          placeholder="Select an option"
        />

        Text shown on action page enticing users to do something
        <input
          type="text"
          placeholder="Here are some ways..."
          onChange={this._onChangeImpactText}
        />

        Title shown when no senator within zip-code is a co-sponsor
        <input
          type="text"
          placeholder="No! Your senators support..."
          onChange={this._onChangeNoCosponsor}
        />

        Text shown below title defined above
        <input
          type="text"
          placeholder="But have you hard of..."
          onChange={this._onChangeNoCosponsorDesc}
        />

        Text shown when more than one senator within zip-code are co-sponsors
        <input
          type="text"
          placeholder="co-sponsored the bill..."
          onChange={this._onChangeCosponsorText}
        />


        <input
          type="text"
          placeholder="#gender represents your voice!"
          onChange={this._onChangeRepresentText}
        />
      </div>

      <div className={houseFields}>
        Text shown for representative who voted for bill
        <input
          type="text"
          placeholder="#member voted for the [...] bill..."
          onChange={this._onChangeVotedFor}
        />

        Text shown for representative who voted against bill
        <input
          type="text"
          placeholder="#member voted aganst the [...] bill..."
          onChange={this._onChangeVotedAgainst}
        />
      </div>
      <button className={buttonClasses} onClick={this._handleClick}>Save changes</button>
    </div>;
  }
};

export default Edit;
