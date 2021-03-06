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
 * @param {string} [bundleTitle=Default Title] - Title of the bundle
 * @param {number} [resourcesCount=0] - Total resources included in the bundle
 * @param {string} [bundleDescription=null] - Description of the bundle
 */
function BundleInfo({
  bundleTitle,
  resourcesCount,
  bundleDescription,
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
