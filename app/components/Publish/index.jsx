import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Tooltip } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withRouter, Redirect } from 'react-router-dom';

import Button from '../Button';
import PageLayout from '../PageLayout';
import messages from './messages';
import './publish.css';

/**
 * Publish component
 */
function Publish({
  /* eslint-disable react/prop-types */ // react-router-dom props
  history,
  location,
}) {
  return (
    <PageLayout>
      {
        location.state ? ( // checking if internal navigation has happened
          <div className="publish-content">
            <div className="publish-title">
              <FormattedMessage {...messages.publishTitle} />
            </div>
            <div className="publish-bundle-id-title">
              <FormattedMessage {...messages.bundleID} />
            </div>
            <div className="publish-bundle-id">
              { location.state.bundleID }
            </div>
            <div className="publish-button-group">
              <span>
                <Button
                  text={messages.viewButton}
                  onClick={
                    () => history.push(`/bundle/?bundleID=${location.state.bundleID}`)
                  }
                />
              </span>
              <CopyToClipboard text={
                `https://bundlem.in/bundle/?bundleID=${location.state.bundleID}`
              }
              >
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
        ) : (
          <Redirect to="/create" />
        )
      }
    </PageLayout>
  );
}

export default withRouter(Publish);

export { Publish as PublishComponent };
