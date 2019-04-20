import React from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import Publish from '../../components/Publish';
import RobotMessage from './RobotMessage';
import PageLayout from '../../components/PageLayout';
import messages from './messages';

const propTypes = {
  isVerifyingToken: PropTypes.bool.isRequired,
  isPublishingBundle: PropTypes.bool.isRequired,
  isBundlePublished: PropTypes.bool.isRequired,
  bundleID: PropTypes.number,
  error: PropTypes.string,
  verifyToken: PropTypes.func.isRequired,
};

const defaultProps = {
  bundleID: null,
  error: null,
};

/**
 * RobotContent component
 * NOTE: The code for this component belongs in Robot container and hence
 * this component is redundant. It is created only to make the Robot container easily testable.
 * @param {boolean} isVerifyingToken - States whether the verification is in progress
 * @param {boolean} isPublishingBundle - States whether the bundle is getting published
 * @param {boolean} isBundlePublished - States whether the bundle is published
 * @param {number} bundleID - ID received for the bundle after publishing
 * @param {string} error - Errors received while performing any API calls
 * @param {function} verifyToken - Redux action to initiate verification of the token (ReCAPTCHA)
 */
function RobotContent({
  isVerifyingToken,
  isPublishingBundle,
  isBundlePublished,
  bundleID,
  error,
  verifyToken,
}) {
  const currentTask = () => {
    let messageElement = null;

    if (isVerifyingToken) {
      messageElement = <RobotMessage message={messages.verifyingToken} />;
    } else if (isPublishingBundle) {
      messageElement = <RobotMessage message={messages.publishingBundle} />;
    }

    return messageElement;
  };

  return (
    <React.Fragment>
      {
        isBundlePublished ? (
          <Publish bundleID={bundleID} />
        ) : (
          <React.Fragment>
            <Helmet
              title="Robot"
              meta={[
                {
                  name: 'description',
                  content: 'Description of Robot',
                },
              ]}
            />
            <PageLayout>
              <div className="robot-content">
                <div className="robot-title">
                  <FormattedMessage {...messages.robotPageTitle} />
                </div>
                <ReCAPTCHA
                  sitekey="6LdinngUAAAAAJv63RkqJmFqFh6sbxIlN42ZdFiu"
                  onChange={verifyToken}
                />
                {
                  error ? (
                    <RobotMessage
                      isError
                      isLoading={false}
                      message={messages[error]}
                      errorClassName="theme-blue-error-message"
                    />
                  ) : currentTask()
                }
              </div>
            </PageLayout>
          </React.Fragment>
        )
      }
    </React.Fragment>
  );
}

RobotContent.propTypes = propTypes;
RobotContent.defaultProps = defaultProps;

export default RobotContent;
