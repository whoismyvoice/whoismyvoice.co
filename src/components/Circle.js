import React from 'react'
import cx from 'classnames'

// Styles
import style from './../styles/Circle.scss';

const Circle = React.createClass({
  render() {

  	var random = this.props.random ? 'long' : '',
  		status = this.props.random ? 'No!' : 'Yes!',
      additional = this.props.additional === null ? null : this.props.additional,
      senator = additional === null ? 'Your Senator, ' : '',
  		details;

  	if(!random && additional === null) {
  		details = 'a ' + this.props.age + ' year old ' + this.props.gender + ' ';
  	}

    // Define classes for showing second line to allow for not displaying anything
    // when two senators have been fetched
    var statusClasses = cx(
      ['status'], 
      {'hide': additional}
    );

  	if(this.props.random !== undefined) {

  		return <div className={'circle' + ' ' + this.props.style + ' ' + random}>

  			<div className="description">
          {status}<br />

          <div className={statusClasses}>
  				  {senator} <br />
          </div>

  				<span className="strike-out">
  					{details}
  				</span>

  				{this.props.desc}
  			</div>
  		</div>;

  	} else {

  		return	<div className={'circle ' + ' ' + this.props.style + ' ' + random}>
    		<div className="description">
    			{this.props.desc}
    		</div>
    	</div>;
  	}
  }
});

export default Circle;
