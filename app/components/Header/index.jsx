import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import messages from './messages';
import './header.css';

const propTypes = {
  headerTitle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
  }),
  headerTitleString: PropTypes.string,
  setString: PropTypes.bool,
  homeRedirection: PropTypes.bool,
};

const defaultProps = {
  headerTitle: messages.defaultHeaderTitle,
  headerTitleString: 'Bundlem',
  setString: false,
  homeRedirection: true,
};

/**
 * Header component
 * @param {object} headerTitle - Header title to be shown (react-intl)
 * @param {string} [headerTitleString=Bundlem] - Header title in string
 * @param {boolean} [setString=false] - States whether the header title is in string format
 * @param {boolean} [homeRedirection=true] - States whether clicking on header redirects user to /
 */
function Header({
  headerTitle,
  headerTitleString,
  setString,
  homeRedirection,
}) {
  return (
    <header className="header theme-blue">
      {
        homeRedirection ? (
          <Link
            className="theme-blue"
            to="/"
          >
            {setString ? headerTitleString : <FormattedMessage {...headerTitle} />}
          </Link>
        ) : (
          <React.Fragment>
            {setString ? headerTitleString : <FormattedMessage {...headerTitle} />}
          </React.Fragment>
        )
      }
    </header>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default React.memo(Header);
