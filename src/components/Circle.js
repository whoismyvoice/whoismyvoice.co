import React from 'react';
import cx from 'classnames';

// Styles
import style from './../styles/Circle.scss';

const Circle = React.createClass({
  render() {
  	const hfc = this.props.hfc ? 'long' : '';
  	const status = hfc ? 'No!' : 'Yes!';
    const additional = this.props.additional === null ? null : this.props.additional;
    const senator = additional === null ? 'Your Senator, ' : '';
  	let details;
    const proposition = additional === null ? 'a ' : '';

    details = (!hfc && additional === null) ? this.props.age + ' year old ' + this.props.gender + ' ' : '';

    // Define classes for showing second line to allow for not displaying anything
    // when two senators have been fetched
    const statusClasses = cx(
      ['status'],
      {'hide': this.props.hide}
    );

    const introductionClasses = cx(
      ['status'],
      {'hide': additional},
      {'hide': this.props.hide}
    );

  	if (hfc !== undefined) {
  		return <div className={'circle ' + this.props.style + ' ' + hfc}>

  			<div className="description">
          <div className={statusClasses}>
            {status}<br />
          </div>

          <div className={introductionClasses}>
  				  {senator} <br />
          </div>

          {proposition}
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
