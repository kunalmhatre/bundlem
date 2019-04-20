import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import numeral from 'numeral';

import { domain } from '../../utils/apis';
import messages from './messages';
import './bundle-card.css';

const propTypes = {
  bundleID: PropTypes.number,
  bundleTitle: PropTypes.string,
  resourcesCount: PropTypes.number,
  clickable: PropTypes.bool,
};

const defaultProps = {
  bundleID: 1,
  bundleTitle: 'Online Privacy',
  resourcesCount: 13,
  clickable: true,
};

/**
 * BundleCard component is used to display meta data about a bundle
 * @param {number} bundleID - Unique ID given to the bundle
 * @param {string} bundleTitle - Bundle title
 * @param {number} resourcesCount - Number of resources present in the bundle
 * @param {boolean} [clickable=true] - Sets the state of the links on the card; clickable or not
 */
function BundleCard({
  bundleID,
  bundleTitle,
  resourcesCount,
  clickable,
}) {
  return (
    <div className="bundle-card theme-blue-inverse">
      <div className="bundle-card-title">
        <a
          className="theme-blue-inverse"
          href={clickable ? `${domain}/bundle/?bundleID=${bundleID}` : null}
        >
          { bundleTitle }
        </a>
      </div>
      <div className="bundle-card-actions">
        <div>
          <span>{ numeral(resourcesCount).format('0a') }</span>
          <FormattedMessage {...messages.res} />
        </div>
        <div>
          <a href={clickable ? `${domain}/bundle/?bundleID=${bundleID}` : null}>
            <FormattedMessage {...messages.view} />
          </a>
        </div>
      </div>
    </div>
  );
}

BundleCard.propTypes = propTypes;
BundleCard.defaultProps = defaultProps;

export default BundleCard;
