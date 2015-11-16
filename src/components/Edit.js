import React from 'react';
import request from 'superagent';

// Components
import BaseComponent from './BaseComponent';
import EditInput from './Edit/EditInput';
import EditTextArea from './Edit/EditTextArea';
import SenateActions from '../actions/SenateActions';

class Edit extends BaseComponent {
  constructor() {
    super();
  }

  _handleClick() {
    request
    .post('api/settings/edit')
    .send({
      id: 1,
      bill_id: "hr1599-114",
      bill_title: "test 123",
      bill_desc: "test 456",
      vote_favor: "Yea",
      chamber: "house",
      created_at: Date.now(),
      senate: {
        impact_text: 'test 789',
        no_cosponsor_title: 'test 101112',
        cosponsor_post_text: 'test 131415',
        represent: 'test 161718'
      },
      house: {
        single_voted_for: 'test 192021',
        single_voted_against: 'test 222324',
        multiple_results: 'test 252627'
      }
    })
    .set('Accept', 'application/json')
    .end((err, res) => {
      if(err) return console.error(err);
      SenateActions.flush('settings');
    });
  }

  render() {
  	return <div className="page-block">
      <EditInput title="Bill ID" />
      <EditInput title="Bill Title" />
      <EditInput title="Bill Description" />
      <EditInput title="Vote Favor" />
      <EditInput title="Chamber" />
      <br />
      <button onClick={this._handleClick}>Save changes</button>
    </div>;
  }
};

export default Edit;
