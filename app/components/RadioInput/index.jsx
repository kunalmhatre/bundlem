import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import shortid from 'shortid';
import classNames from 'classnames';

import messages from './messages';
import './radio-input.css';

const formattedMessagePropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string.isRequired,
});

const propTypes = {
  items: PropTypes.arrayOf(formattedMessagePropTypes),
  value: PropTypes.string,
  onChange: PropTypes.func,
  showError: PropTypes.bool,
  errorMessage: formattedMessagePropTypes,
  label: formattedMessagePropTypes,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  intl: intlShape.isRequired,
};

const defaultProps = {
  items: [messages.defaultRadioItem],
  value: '',
  onChange: () => null,
  onBlur: () => null,
  showError: false,
  errorMessage: messages.defaultErrorMessage,
  label: messages.defaultRadioLabel,
  name: shortid.generate(),
};

/**
 * RadioInput component
 * @param {array} items - Radio inputs (items) to be rendered
 * @param {number} value - Value of the selected item
 * @param {function} onChange - Handler function for onChange (default blank function)
 * @param {function} onBlur - Handler function for onBlur (default blank function)
 * @param {boolean} [showError=false] - Shows error below the input field when true
 * @param {object} errorMessage - Error message to be shown (react-intl)
 * @param {object} label - Label for the radio input (react-intl)
 * @param {string} name - Sets name attribute for the radio input field (random when not provided)
 */
function RadioInput({
  items,
  value,
  onChange,
  onBlur,
  showError,
  errorMessage,
  label,
  name,
  intl, // react-intl prop
}) {
  return (
    <div className="radio-input-container theme-blue">
      <div className="radio-input-main-label">
        <FormattedMessage {...label} />
      </div>
      <ul className="radio-input-group">
        {
          items.map((item, index) => {
            const valueFM = intl.formatMessage(item);
            const classes = classNames(
              { 'radio-input': true },
              { 'theme-blue-inverse': value === valueFM },
            );

            return (
              <li
                key={shortid.generate()}
                className={classes}
              >
                <label
                  htmlFor={`radio-input-${index}`}
                  className="radio-input-label"
                >
                  <FormattedMessage {...item} />
                  <input
                    id={`radio-input-${index}`}
                    type="radio"
                    name={name}
                    className="radio-input-field"
                    value={valueFM}
                    checked={value === valueFM}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                </label>
              </li>
            );
          })
        }
      </ul>
      <div className="radio-input-error-message theme-blue-error-message">
        { showError ? <FormattedMessage {...errorMessage} /> : null }
      </div>
    </div>
  );
}

RadioInput.propTypes = propTypes;
RadioInput.defaultProps = defaultProps;

export default React.memo(injectIntl(RadioInput));
