import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import shortid from 'shortid';

import messages from './messages';
import './input.css';

const formattedMessagePropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string.isRequired,
});

const propTypes = {
  label: formattedMessagePropTypes,
  placeholder: formattedMessagePropTypes,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  showError: PropTypes.bool,
  errorMessage: formattedMessagePropTypes,
  autoFocus: PropTypes.bool,
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  intl: intlShape.isRequired,
};

const defaultProps = {
  label: messages.defaultLabel,
  placeholder: messages.defaultPlaceholder,
  onChange: () => null,
  onBlur: () => null,
  showError: false,
  errorMessage: messages.defaultErrorMessage,
  autoFocus: false,
  value: '',
  name: shortid.generate(),
  id: shortid.generate(),
};

/**
 * Input component
 * @param {object} [label=Default Label] - Label for the input field (react-intl)
 * @param {object} [placeholder=Default Placeholder] - Placeholder for the input field (react-intl)
 * @param {function} onChange - Handler function for onChange (default blank function)
 * @param {function} onBlur - Handler function for onBlur (default blank function)
 * @param {boolean} [showError=false] - Shows error below the input field when true
 * @param {object} [errorMessage=Default Error Message] - Error message to be shown (react-intl)
 * @param {boolean} [autoFocus=false] - Sets autofocus attribute for the input field
 * @param {string} value - Value for the input field
 * @param {string} name - Sets name attribute for the input field (random when not provided)
 * @param {string} id - Sets id attribute for the input field (random when not provided)
 */
function Input({
  label,
  placeholder,
  onChange,
  onBlur,
  showError,
  errorMessage,
  autoFocus,
  value,
  name,
  id,
  intl, // react-intl prop
}) {
  const inputClasses = classNames(
    { 'input-field': true },
    { 'theme-blue-error-border': showError },
  );
  const placeholderFM = intl.formatMessage(placeholder);

  return (
    <div className="input theme-blue">
      <label htmlFor={id}>
        <div className="input-label">
          <FormattedMessage {...label} />
        </div>
        <input
          id={id}
          className={inputClasses}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholderFM}
          autoFocus={autoFocus}
          value={value}
          name={name}
        />
      </label>
      <div className="input-error-message theme-blue-error-message">
        { showError ? <FormattedMessage {...errorMessage} /> : null }
      </div>
    </div>
  );
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default React.memo(injectIntl(Input));
