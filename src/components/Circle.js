import React from 'react'
import cx from 'classnames'

// Styles
import style from './../styles/Circle.scss';

const Circle = React.createClass({
  render() {
  	let hfc = this.props.hfc ? 'long' : '',
  		  status = hfc ? 'No!' : 'Yes!',
        additional = this.props.additional === null ? null : this.props.additional,
        senator = additional === null ? 'Your Senator, ' : '',
        hide = this.props.did_search === false ? true : false,
  		  details;

    details = (!hfc && additional === null) ? 'a ' + this.props.age + ' year old ' + this.props.gender + ' ' : '';

    // Define classes for showing second line to allow for not displaying anything
    // when two senators have been fetched
    let statusClasses = cx(
      ['status'],
      {'hide': this.props.hide}
    );

    let introductionClasses = cx(
      ['status'],
      {'hide': additional},
      {'hide': this.props.hide}
    );

  	if (hfc !== undefined) {
  		return <div className={'circle' + ' ' + this.props.style + ' ' + hfc}>

  			<div className="description">
          <div className={statusClasses}>
            {status}<br />
          </div>

          <div className={introductionClasses}>
  				  {senator} <br />
          </div>

  				<span className="strike-out">
  					{details}
  				</span>

  				{this.props.desc}
  			</div>
  		</div>;
  	} else {
  		return	<div className={'circle ' + ' ' + this.props.style + ' ' + hfc}>
    		<div className="description">
    			{this.props.desc}
    		</div>
    	</div>;
  	}
  }
});

export default Circle;
