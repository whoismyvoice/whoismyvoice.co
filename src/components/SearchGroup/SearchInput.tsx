import React, { ChangeEventHandler, VFC, useState } from 'react';

// Assets
import '../../styles/SearchInput.scss';

const isUsZip = /^(\d{5})(-\d{4})?$/;

interface Props {
  errorMessage?: string;
  name: string;
  pattern?: string;
  placeholder?: string;
}

export const SearchInput: VFC<Props> = (props) => {
  const {
    errorMessage,
    pattern = '[0-9]*',
    placeholder = 'Enter Your Zip Code',
    name,
  } = props;
  const [isValidInput, setIsValidInput] = useState(true);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target;
    const value = target.value;
    setIsValidInput(value === null || value === '' || isUsZip.test(value));
  };
  const isError = !isValidInput || errorMessage !== undefined;
  return (
    <React.Fragment>
      <SearchInputError errorMessage={errorMessage} />
      <input
        type="text"
        name={name}
        className={isError ? 'error' : ''}
        pattern={pattern}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </React.Fragment>
  );
};

export const SearchInputError: VFC<Pick<Props, 'errorMessage'>> = (props) => {
  const { errorMessage } = props;
  return errorMessage === undefined ? (
    <React.Fragment />
  ) : (
    <p className="search-input-message--error">{errorMessage}</p>
  );
};
