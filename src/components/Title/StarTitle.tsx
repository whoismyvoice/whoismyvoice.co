import * as React from 'react';
import * as _ from 'lodash';

import '../../styles/TitleComponent.css';

interface Props {
  templateData?: object;
  templateString?: string;
}

export class StarTitle extends React.Component<Props> {
  static defaultProps = {
    templateData: {},
  };

  template: _.TemplateExecutor;

  constructor(props: Props) {
    super(props);
    this.template = _.template(props.templateString);
  }

  UNSAFE_componentWillUpdate(nextProps: Readonly<Props>) {
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
