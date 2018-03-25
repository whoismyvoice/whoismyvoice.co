import * as React from 'react';

// Assets
import '../../styles/SearchInput.css';

const isUsZip = /^(\d{5})(-\d{4})?$/;

interface Props {
  errorMessage?: string;
  name: string;
  pattern?: string;
  placeholder?: string;
}

interface State {
  isError: boolean;
}

class SearchInput extends React.Component<Props, State> {
  static defaultProps = {
    errorMessage: undefined,
    pattern: '[0-9]*',
    placeholder: 'Enter Your Zip Code',
  };

  state = {
    isError: false,
  };

  constructor(props: Props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      isError: props.errorMessage !== undefined,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.errorMessage !== undefined) {
      this.setState({
        isError: true,
      });
    }
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value = target.value;
    this.setState({
      isError: value !== null && value !== '' && !isUsZip.test(value),
    });
  }

  renderError() {
    const { errorMessage } = this.props;
    return errorMessage === undefined ? null : (
      <p className="search-input-message--error">{errorMessage}</p>
    );
  }

  render() {
    const { name, pattern, placeholder } = this.props;
    const { isError } = this.state;
    return (
      <React.Fragment>
        {this.renderError()}
        <input
          type="text"
          name={name}
          className={isError ? 'error' : ''}
          pattern={pattern}
          placeholder={placeholder}
          onChange={this.onChange}
        />
      </React.Fragment>
    );
  }
}

export default SearchInput;
