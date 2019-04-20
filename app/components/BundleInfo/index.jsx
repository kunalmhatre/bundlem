import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './bundle-info.css';

const propTypes = {
  bundleTitle: PropTypes.string,
  resourcesCount: PropTypes.number,
  bundleDescription: PropTypes.string,
};

const defaultProps = {
  bundleTitle: 'Default Title',
  resourcesCount: 0,
  bundleDescription: null,
};

/**
 * BundleInfo
 * @param {string} bundleTitle - Title of the bundle
 * @param {string} bundleDescription - Description of the bundle
 * @param {number} resourcesCount - Total resources included in the bundle
 */
function BundleInfo({
  bundleTitle,
  bundleDescription,
  resourcesCount,
}) {
  return (
    <div className="bundle-info theme-blue">
      <div className="bundle-info-title">{bundleTitle}</div>
      {
        bundleDescription ? (
          <div className="bundle-info-description">{bundleDescription}</div>
        ) : null
      }
      <div className="bundle-info-resources-count">
        <FormattedMessage {...messages.resources} />
        {resourcesCount}
      </div>
    </div>
  );
}

BundleInfo.propTypes = propTypes;
BundleInfo.defaultProps = defaultProps;

export default BundleInfo;
