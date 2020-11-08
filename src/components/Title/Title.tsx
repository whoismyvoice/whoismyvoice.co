import * as React from 'react';
import template from 'lodash.template';

import '../../styles/TitleComponent.scss';

type TemplateExecutor = ReturnType<typeof template>;

export interface Props {
  className: string;
  templateData: Record<string, unknown>;
  templateString: string;
}

export interface State {
  templateData?: Record<string, string>;
  templateString?: string;
}

export class Title<P extends Props, S extends State> extends React.Component<
  P,
  S
> {
  static defaultProps = {
    className: '',
    templateData: {},
    templateString: '',
  };

  template: TemplateExecutor;

  constructor(props: P) {
    super(props);
    this.template = template(props.templateString);
  }

  UNSAFE_componentWillUpdate(
    nextProps: Readonly<P>,
    nextState: Readonly<S>
  ): void {
    if (
      this.state !== undefined &&
      this.state.templateString !== undefined &&
      this.state.templateString !== nextState.templateString
    ) {
      this.template = template(nextState.templateString);
    } else if (this.props.templateString !== nextProps.templateString) {
      this.template = template(nextProps.templateString);
    }
  }

  getTemplateData(): Record<string, unknown> | undefined {
    if (this.state && this.state.templateData !== undefined) {
      return this.state.templateData;
    } else if (this.props.templateData !== undefined) {
      return this.props.templateData;
    } else {
      return {};
    }
  }

  render(): JSX.Element {
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
