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

// Styles
import style from './../styles/Edit.scss';

class Edit extends BaseComponent {
  constructor() {
    super();
    this._bind(
      '_onSelect',
      '_onSelectChamber',
      '_onChangeID',
      '_onBlurID',
      '_onChangeBillTitle',
      '_onBlurBillTitle',
      '_onChangeBillDesc',
      '_onBlurBillDesc',
      '_onChangeImpactText',
      '_onBlurImpactText',
      '_onChangePretext',
      '_onBlurPretext',
      '_onChangeVotedFor',
      '_onBlurVotedFor',
      '_onChangeVotedAgainst',
      '_onBlurVotedAgainst',
      '_onSubmit',
      '_checkForErrors'
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
      voted_against: '',
      errors: []
    }
  }

  _checkForErrors(field, min, max, length) {
    if(length > min && length < max) {
      if(this.state.errors.indexOf(field) === -1) {
        this.setState((state) => {
          errors: state.errors.push(field);
        });
      }
    } else if(length > max) {
      if(this.state.errors.indexOf(field) !== -1) {
        const index = this.state.errors.indexOf('field');
        this.setState((state) => {
          errors: state.errors.splice(index, 1);
        })
      }
    }
  }

  // Handle select options
  _onSelect(option) {
    this.setState({vote_favor: option.value});
  }
  _onSelectChamber(option) {
    this.setState({chamber: option.value});
  }

  // Handle ID input field
  _onChangeID(evt) {
    this.setState({bill_id: evt.target.value});
  }
  _onBlurID(evt) {
    this._checkForErrors('Bill id', 0, 4, evt.target.value.length);
  }

  // Handle Bill title input field
  _onChangeBillTitle(evt) {
    this.setState({bill_title: evt.target.value});
  }
  _onBlurBillTitle(evt) {
    this._checkForErrors('Bill title', 0, 5, evt.target.value.length);
  }

  // Handle Bill desc input field
  _onChangeBillDesc(evt) {
    this.setState({bill_desc: evt.target.value});
  }
  _onBlurBillDesc(evt) {
    this._checkForErrors('Bill question', 0, 10, evt.target.value.length);
  }

  // Handle impact text input field
  _onChangeImpactText(evt) {
    this.setState({impact_text: evt.target.value});
  }
  _onBlurImpactText(evt) {
    this._checkForErrors('Text on action page', 0, 10, evt.target.value.length);
  }

  // Handle pre-text input field
  _onChangePretext(evt) {
    this.setState({pre_text: evt.target.value});
  }
  _onBlurPretext(evt) {
    this._checkForErrors('Pre-text', 0, 10, evt.target.value.length);
  }

  // Handle voted for input field
  _onChangeVotedFor(evt) {
    this.setState({voted_for: evt.target.value});
  }
  _onBlurVotedFor(evt) {
    this._checkForErrors('Voted for text', 0, 5, evt.target.value.length);
  }

  // Handle voted against input field
  _onChangeVotedAgainst(evt) {
    this.setState({voted_against: evt.target.value});
  }
  _onBlurVotedAgainst(evt) {
    this._checkForErrors('Voted against text', 0, 5, evt.target.value.length);
  }

  _onSubmit() {
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
    const {
      bill_id,
      bill_title,
      bill_desc,
      vote_favor,
      chamber,
      pre_text,
      impact_text,
      voted_for,
      voted_against,
      errors
    } = this.state;

    const isEmpty = () => {
      if(bill_id === '' || bill_title === '' || bill_desc === '' || chamber === 'Senate' && vote_favor === '' || chamber === '' || pre_text === '' || impact_text === '' || voted_for === '' || voted_against === '') {
        return true;
      } else {
        return false;
      }
    };

    const senateFields = cx(
      ['form-fields'],
      {'hide': chamber === '' || chamber === '0'}
    );

    const buttonClasses = cx(
      ['button'],
      {'disabled': isEmpty()}
    );

    const VoteOptions = [
      { value: '1', label: 'Yea'},
      { value: '0', label: 'Nay'}
    ];

    const ChamberOptions = [
      {value: '1', label: 'Senate'},
      {value: '0', label: 'House'}
    ];

    function notEmpty(state) {
      return state.length > 0;
    };

    const errorClasses = cx(
      ['edit__error'],
      {'edit__error--show': this.state.errors.length !== 0}
    );

    const errorsSplit = `The following fields were not populated: ${errors.join(", ")}`

  	return <div className="page-block edit">
      <FadedBG color="orange-color" />
      <form id="editform" onSubmit={this._onSubmit}>
      <div className="card">
        <h2>Bill details</h2>
        <EditInput
          onChange={this._onChangeID}
          onBlur={this._onBlurID}
          value={this.state.bill_id}
          example="s1881-114"
          placeholder="Enter bill id"
        />
        <EditInput
          onChange={this._onChangeBillTitle}
          onBlur={this._onBlurBillTitle}
          value={this.state.bill_title}
          example="Accurate Food Labeling Act of 2015"
          placeholder="Enter bill title"
        />
        <EditInput
          onChange={this._onChangeBillDesc}
          onBlur={this._onBlurBillDesc}
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
          onBlur={this._onBlurPretext}
          note={'Note: You can use tags: #member_type, #member_name #action'}
          value={this.state.cosponsor_post_text}
          example="Your Congressman/Senator, Name Nameson voted to/co-sponsored"
          placeholder="Pre-text "
          className="long"
        />
        <EditInput
          onChange={this._onChangeVotedFor}
          onBlur={this._onBlurVotedFor}
          value={this.state.voted_for}
          example="reverse Obamacare"
          placeholder="Voted for text shown after pre-text"
          className="long"
        />
        <EditInput
          onChange={this._onChangeVotedAgainst}
          onBlur={this._onBlurVotedAgainst}
          value={this.state.voted_against}
          example="not reverse Obamacare"
          placeholder="Voted against text shown after pre-text"
          className="long"
        />
        <EditTextArea
          onChange={this._onChangeImpactText}
          onBlur={this._onBlurImpactText}
          placeholder="Text shown on the third (action) page enticing users to tweet, call and email"
          note="Note: Use tag #gender_third to add senators gender as him or her."
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
      <div className={errorClasses}>
        An error occurred.<br /> {errorsSplit}
      </div>
      <button className={buttonClasses} form="editform" type="submit">Save changes</button>
      </form>
    </div>;
  }
};

export default Edit;
