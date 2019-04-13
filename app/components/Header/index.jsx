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
  headerTitleString: PropTypes.string,
  setString: PropTypes.bool,
};

const defaultProps = {
  headerTitle: messages.defaultHeaderTitle,
  headerTitleString: 'Bundlem',
  setString: false,
};

/**
 * Header component
 * @param {object} headerTitle - Header title to be shown (react-intl message object)
 * @param {string} headerTitleString - Header title in string
 * @param {boolean} [setString=false] - States whether the header title is in string format
 */
function Header({ headerTitle, headerTitleString, setString }) {
  return (
    <header className="header theme-blue">
      {setString ? headerTitleString : <FormattedMessage {...headerTitle} />}
    </header>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default React.memo(Header);
