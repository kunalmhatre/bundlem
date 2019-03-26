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
  headerTitle: messages.header,
};

/**
 * Header for the application
 * @param {object} headerTitle - Header title to be shown
 */
function Header({ headerTitle }) {
  return (
    <div className="header theme-blue">
      <FormattedMessage {...headerTitle} />
    </div>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default React.memo(Header);
