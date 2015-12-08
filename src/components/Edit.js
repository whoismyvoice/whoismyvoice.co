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
      '_onSelectType',
      '_onChangeID',
      '_onBlurID',
      '_onChangeBillDesc',
      '_onChangeCommittee',
      '_onBlurCommittee',
      '_onChangeCycleYear',
      '_onBlurYear',
      '_onBlurBillDesc',
      '_onBlurBillTitle',
      '_onChangeBillTitle',
      '_onChangeImpactText',
      '_onBlurImpactText',
      '_onChangePretext',
      '_onBlurPretext',
      '_onChangeVotedFor',
      '_onBlurVotedFor',
      '_onChangeVotedAgainst',
      '_onBlurVotedAgainst',
      '_onSubmit',
      '_checkForErrors',
      '_addError',
      '_removeError'
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
      errors: [],
      sponsor: false,
      sponsor_year: '',
      sponsor_id: ''
    };
  }
  // Error handling
  _addError(field) {
    if (this.state.errors.indexOf(field) === -1) {
      this.setState((state) => {
        errors: state.errors.push(field);
      });
    }
  }
  _removeError(field) {
    if (this.state.errors.indexOf(field) !== -1) {
      const index = this.state.errors.indexOf('field');
      this.setState((state) => {
        errors: state.errors.splice(index, 1);
      });
    }
  }
  _checkForErrors(field, min, max, length) {
    if (length > min && length < max) {
      this._addError(field);
    } else if (length > max) {
      this._removeError(field);
    }
  }
  // Handle select options
  _onSelect(option) {
    this.setState({vote_favor: option.value});
  }
  _onSelectChamber(option) {
    this.setState({chamber: option.value});
  }
  _onSelectType(option) {
    this.setState({type: option.value});
  }

  // Handle ID input field
  _onChangeID(evt) {
    this.setState({bill_id: evt.target.value});
  }
  _onBlurID(evt) {
    this._checkForErrors('Bill id', 0, 4, evt.target.value.length);
  }

  // Handle ID input field
  _onChangeCycleYear(evt) {
    this.setState({sponsor_year: evt.target.value});
  }
  _onBlurYear(evt) {
    this._checkForErrors('Year', 0, 3, evt.target.value.length);
  }

  // Handle ID input field
  _onChangeCommittee(evt) {
    this.setState({sponsor_id: evt.target.value});
  }
  _onBlurCommittee(evt) {
    this._checkForErrors('Year', 0, 5, evt.target.value.length);
  }

  // Handle Bill desc input field
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
      voted_for: this.state.voted_for || 'Voted for is not defined',
      voted_against: this.state.voted_against || 'Voted against is not defined'
    })
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) return console.error(err);
      SenateActions.flush('settings');
    });
  }

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
      errors,
      type
    } = this.state;

    const isEmpty = () => {
      if (bill_id === '' || bill_title === '' || bill_desc === '' || chamber === 'Senate' && vote_favor === '' || chamber === '' || pre_text === '' || impact_text === '' || voted_for === '' || voted_against === '') {
        return true;
      } else {
        return false;
      }
    };

    const VoteOptions = [
      {value: '1', label: 'Yea'},
      {value: '0', label: 'Nay'}
    ];

    const VoteTypeOptions = [
      {value: '2', label: 'Lobbying'},
      {value: '1', label: 'House bill'},
      {value: '0', label: 'Senate bill'}
    ];

    const ChamberOptions = [
      {value: '1', label: 'Senate'},
      {value: '0', label: 'House'}
    ];

    const senateFields = cx(
      ['form-fields'],
      {'hide': chamber === '' || chamber === '1'}
    );

    const LobbyFields = cx(
      ['form-fields'],
      {'hide': type === '' || type !== '2'}
    );

    const buttonClasses = cx(
      ['button'],
      {'disabled': isEmpty()}
    );

    const errorClasses = cx(
      ['edit__error'],
      {'edit__error--show': errors.length !== 0}
    );

    const previewClasses = cx(
      ['edit__preview'],
      {'edit--hide': !pre_text}
    );

    const previewClassesImpact = cx(
      ['edit__preview'],
      {'edit--hide': !impact_text}
    );

    const previewClassesBillDesc = cx(
      ['edit__preview'],
      {'edit--hide': !bill_desc}
    );

    const BillIdFields = cx(
      ['card'],
      {hide: type === '2'}
    );

    const errorsSplit = `The following fields were not populated: ${errors.join(', ')}`;

  	return <div className="page-block edit">
      <FadedBG color="orange-color" />
      <form id="editform" onSubmit={this._onSubmit}>

        <div className="card">
          <EditDropdown
            title="Select Type"
            options={VoteTypeOptions}
            onChange={this._onSelectType}
            placeholder="Select type"
          />
        </div>

        <div className={LobbyFields}>
          <div className="card">
          <h2>Year cycle</h2>
          <EditInput
            onChange={this._onChangeCycleYear}
            onBlur={this._onBlurYear}
            value={this.state.sponsor_year}
            example="2014"
            placeholder="Enter year cycle"
          />
          <h2>Lobby organization FEC Committee ID</h2>
          <EditInput
            onChange={this._onChangeCommittee}
            onBlur={this._onBlurCommittee}
            value={this.state.sponsor_id}
            example="C00053553"
            placeholder="FEC Committee ID"
          />
          </div>
        </div>

        <div className={BillIdFields}>
          <h2>Bill details</h2>
          <div className={previewClassesBillDesc}>
            {`${bill_desc.replace('#member', 'Congressman')} ${bill_title}?`}
          </div>
          <EditInput
            onChange={this._onChangeID}
            onBlur={this._onBlurID}
            value={this.state.bill_id}
            example="s1881-114"
            placeholder="Enter bill id"
          />
        </div>

        <div className="card">
          <h2>Bill details</h2>
          <EditInput
            onChange={this._onChangeBillTitle}
            onBlur={this._onBlurBillTitle}
            value={this.state.bill_title}
            example="reverse Obamacare"
            placeholder="Bill Title"
            className="long"
          />
          <EditInput
            onChange={this._onChangeBillDesc}
            onBlur={this._onBlurBillDesc}
            note="Note: Use tag #member to be replaced by senator/congressman"
            value={this.state.bill_desc}
            example="Did my #member vote to #bill_title"
            placeholder="Question of the bill (shown on the front page)"
            className="long"
          />
        </div>

        <div className={BillIdFields}>
          <EditDropdown
            title="Select Chamber"
            options={ChamberOptions}
            onChange={this._onSelectChamber}
            placeholder="Select a chamber"
          />
        </div>
        <div className="card">
          <h2>Result texts</h2>
          <div className={previewClasses}>
            {`${pre_text.replace('#member_type', 'Congressman, ').replace('#member_name', 'Name Nameson').replace('#action', 'voted to')} ${voted_for}${bill_title}`}
          </div>
          The text shown on the result page is a combination of: "<b>[pre-text] [voted-for/voted-against] [bill title]</b>".
          <br />E.g. [Your Congressman, Name Nameson] [voted to] [reverse Obamacare]
          <br /><br />
          <EditInput
            onChange={this._onChangePretext}
            onBlur={this._onBlurPretext}
            note="Note: You can use tags: #member_type, #member_name #action"
            value={this.state.cosponsor_post_text}
            example="Your #member_type, #member_name #action"
            placeholder="Pre-text "
            className="long"
          />
          <EditInput
            onChange={this._onChangeVotedFor}
            onBlur={this._onBlurVotedFor}
            value={this.state.voted_for}
            example="House: voted to. Senate: co-sponsored the bill to"
            placeholder="Voted for text shown before bill focus"
            className="long"
          />
          <EditInput
            onChange={this._onChangeVotedAgainst}
            onBlur={this._onBlurVotedAgainst}
            value={this.state.voted_against}
            example="House: voted against. Senate: did not co-sponsor the bill to"
            placeholder="Voted against text shown before bill focus"
            className="long"
          />
        </div>

        <div className="card">
          <h2>Action text</h2>
          <div className={previewClassesImpact}>
            {`${impact_text.replace('#gender_third', 'this person')}`}
          </div>
          Text shown on the third (action) page enticing users to call/tweet at or email.
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
}

export default Edit;
