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
  size: PropTypes.oneOf([
    'default',
    'block',
  ]),
  highlight: PropTypes.bool,
  onClick: PropTypes.func,
};

const defaultProps = {
  text: messages.defaultButtonText,
  size: 'default',
  highlight: true,
  onClick: () => null,
};

/**
 * Button component
 * @param {object} text - Button's text (react-intl message object)
 * @param {string} [size=default] - Set width for the button (default or block)
 * @param {boolean} [highlight=true] - Highlight button (true or false)
 * @param {function} onClick - On click handler function
 */
function Button({
  text,
  size,
  highlight,
  onClick,
}) {
  const classes = classNames(
    { button: true },
    { 'button-block': size === 'block' },
    { 'theme-blue': !highlight },
    { 'theme-blue-inverse theme-blue-border': highlight },
  );

  return (
    <button
      className={classes}
      type="button"
      onClick={onClick}
    >
      <FormattedMessage {...text} />
    </button>
  );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
