import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Tooltip } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Button from '../Button';
import PageLayout from '../PageLayout';
import messages from './messages';
import './publish.css';

const propTypes = {
  bundleID: PropTypes.number,
};

const defaultProps = {
  bundleID: 0,
};

/**
 * Publish component
 * @param {number} bundleID - ID received for the bundle after publishing
 */
function Publish({ bundleID }) {
  return (
    <PageLayout>
      <div className="publish-content">
        <div className="publish-title">
          <FormattedMessage {...messages.publishTitle} />
        </div>
        <div className="publish-bundle-id-title">
          <FormattedMessage {...messages.bundleID} />
        </div>
        <div className="publish-bundle-id">
          { bundleID }
        </div>
        <div className="publish-button-group">
          <span><Button text={messages.viewButton} /></span>
          <CopyToClipboard text={`https://bundlem.in/bundle/${bundleID}`}>
            <Tooltip
              title={<FormattedMessage {...messages.copiedTooltip} />}
              trigger="click"
            >
              <span><Button text={messages.copyLinkButton} /></span>
            </Tooltip>
          </CopyToClipboard>
        </div>
        <div className="publish-thank-you-message">
          <FormattedMessage {...messages.thankYouMessage} />
        </div>
      </div>
    </PageLayout>
  );
}

Publish.propTypes = propTypes;
Publish.defaultProps = defaultProps;

export default Publish;
