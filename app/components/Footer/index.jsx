import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import './footer.css';

const propTypes = {
  linkTitles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      defaultMessage: PropTypes.string.isRequired,
    }),
  ),
  links: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  linkTitles: [
    messages.source,
    messages.reportIssue,
    messages.story,
    messages.author,
  ],
  links: [
    'https://github.com/kunalmhatre/bundlem/',
    'https://github.com/kunalmhatre/bundlem/issues/new/choose',
    'https://kunalmhatre.com/bundlem/',
    'https://kunalmhatre.com/',
  ],
};

/**
 * Footer component
 * @param {array} - Array containing menu items (react-intl message objects)
 * @param {array} - Array containing links for the menu items
 */
function Footer({ linkTitles, links }) {
  if (linkTitles.length !== links.length) return null;

  return (
    <footer className="footer theme-blue">
      {
        linkTitles.map((item, index) => (
          <a
            className="theme-blue"
            key={shortid.generate()}
            href={links[index]}
          >
            <FormattedMessage {...item} />
          </a>
        ))
      }
    </footer>
  );
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
