import React from 'react';
import request from 'superagent';

// Components
import BaseComponent from './BaseComponent';
import SenateActions from '../actions/SenateActions';

class Edit extends BaseComponent {
  constructor() {
    super();

    this.state = {
      id: 1,
      bill_id: 'hr1599-114',
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

  _handleChange(event) {
    this.setState({value: event.target.value});
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
  	return <div className="page-block">

      <br />
      <button onClick={this._handleClick}>Save changes</button>
    </div>;
  }
};

export default Edit;
