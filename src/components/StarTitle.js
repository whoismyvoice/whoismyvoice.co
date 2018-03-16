import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import '../styles/TitleComponent.css';

export class StarTitle extends Component {
  static defaultProps = {
    templateData: {},
  };

  static propTypes = {
    templateData: PropTypes.shape({}),
    templateString: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.template = _.template(props.templateString);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.props.templateString !== nextProps.templateString) {
      this.template = _.template(nextProps.templateString);
    }
  }

  renderStars() {
    return (
      <div className="three-stars">
        <span>&#9733;</span>
        <span>&#9733;</span>
        <span>&#9733;</span>
      </div>
    );
  }

  render() {
    const { templateData } = this.props;
    const content = { __html: this.template(templateData) };
    return (
      <div className="title-component uppercase">
        {this.renderStars()}
        <div
          className="title-component__description"
          dangerouslySetInnerHTML={content}
        />
      </div>
    );
  }
}

export default StarTitle;
