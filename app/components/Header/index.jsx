import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import './header.css';

const propTypes = {
  headerTitle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  headerTitle: messages.defaultHeaderTitle,
};

/**
 * Header component
 * @param {object} headerTitle - Header title to be shown (react-intl message object)
 */
function Header({ headerTitle }) {
  return (
    <header className="header theme-blue">
      <FormattedMessage {...headerTitle} />
    </header>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default React.memo(Header);
