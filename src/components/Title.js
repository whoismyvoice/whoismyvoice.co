import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import '../styles/TitleComponent.css';

export class Title extends Component {
  static defaultProps = {
    className: '',
    templateData: {},
    templateString: '',
  };

  static propTypes = {
    className: PropTypes.string,
    templateData: PropTypes.shape({}),
    templateString: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.template = _.template(props.templateString);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (
      this.state !== undefined &&
      this.state.templateString !== undefined &&
      this.state.templateString !== nextState.templateString
    ) {
      this.template = _.template(nextState.templateString);
    } else if (this.props.templateString !== nextProps.templateString) {
      this.template = _.template(nextProps.templateString);
    }
  }

  getTemplateData() {
    if (this.state && this.state.templateData !== undefined) {
      return this.state.templateData;
    } else if (this.props.templateData !== undefined) {
      return this.props.templateData;
    } else {
      return {};
    }
  }

  render() {
    const { className } = this.props;
    const content = { __html: this.template(this.getTemplateData()) };
    return (
      <div className={`title-component ${className}`}>
        <div
          className="title-component__description"
          dangerouslySetInnerHTML={content}
        />
      </div>
    );
  }
}

export default Title;
