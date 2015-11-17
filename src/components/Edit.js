import React from 'react';
import request from 'superagent';

// Components
import BaseComponent from './BaseComponent';
import SenateActions from '../actions/SenateActions';
import Dropdown from 'react-dropdown';

class Edit extends BaseComponent {
  constructor() {
    super();
    this._bind('_onChangeID', '_onSelectChamber', '_onChangeBillTitle', '_onChangeBillDesc', '_onSelect');

    this.state = {
      id: 1,
      bill_id: '',
      bill_title: '',
      bill_desc: '',
      vote_favor: '',
      chamber: '',
      impact_text: '',
      no_cosponsor_text: '',
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

  _onChangeID(event) {
    this.setState({bill_id: event.target.value});
  }

  _onChangeBillTitle(event) {
    this.setState({bill_title: event.target.value});
  }

  _onChangeBillDesc(event) {
    this.setState({bill_desc: event.target.value});
  }

  _onChangeVoteFavor(event) {
    this.setState({vote_favor: event.target.value});
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
        impact_text: this.state.impact_text,
        no_cosponsor_title: this.state.no_cosponsor_title,
        cosponsor_post_text: this.state.cosponsor_post_text,
        represent: this.state.represent
      },
      house: {
        single_voted_for: this.state.single_voted_for,
        single_voted_against: this.state.single_voted_against,
        multiple_results: 'test 252'
      }
    })
    .set('Accept', 'application/json')
    .end((err, res) => {
      if(err) return console.error(err);
      SenateActions.flush('settings');
    });
  }

  render() {

    const VoteOptions = [
      { value: '1', label: 'Yea'},
      { value: '0', label: 'Nay'}
    ];

    const ChamberOptions = [
      { value: '1', label: 'Senate'},
      {value: '0', label: 'House'}
    ];

    let defaultOption = this.state.selected;

  	return <div className="page-block">
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

      What vote to put in favor?
      <Dropdown
        options={VoteOptions}
        onChange={this._onSelect}
        placeholder="Select an option"
      />

      Select chamber
      <Dropdown
        options={ChamberOptions}
        onChange={this._onSelectChamber}
        placeholder="Select a chamber"
      />

      <br />
      <button onClick={this._handleClick}>Save changes</button>
    </div>;
  }
};

export default Edit;
