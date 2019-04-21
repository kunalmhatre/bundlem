import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import messages from './messages';
import './button.css';

const propTypes = {
  text: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
  }),
  extraText: PropTypes.string,
  size: PropTypes.oneOf([
    'default',
    'block',
  ]),
  highlight: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

const defaultProps = {
  text: messages.defaultButtonText,
  extraText: '',
  size: 'default',
  highlight: true,
  onClick: () => null,
  className: null,
  disabled: false,
};

/**
 * Button component
 * @param {object} text - Button's text (react-intl message object)
 * @param {string} extraText - Extra text to be appended
 * @param {string} [size=default] - Set width for the button (default or block)
 * @param {boolean} [highlight=true] - Highlight button (true or false)
 * @param {function} onClick - On click handler function
 * @param {string} className - Extra class(es) to be applied on button
 * @param {boolean} [disabled=false] - Sets disable attribute for the button
 */
function Button({
  text,
  extraText,
  size,
  highlight,
  onClick,
  className,
  disabled,
}) {
  const classes = classNames(
    { button: true },
    { 'button-block': size === 'block' },
    { 'theme-blue': !highlight },
    { 'theme-blue-inverse': highlight },
    { [className]: className },
  );

  return (
    <button
      className={classes}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <FormattedMessage {...text} />
      { extraText }
    </button>
  );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
