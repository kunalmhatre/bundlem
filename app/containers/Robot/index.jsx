import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReCAPTCHA from 'react-google-recaptcha';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import Publish from '../../components/Publish';
import RobotMessage from './RobotMessage';
import PageLayout from '../../components/PageLayout';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import {
  makeSelectIsVerifyingToken,
  makeSelectIsPublishingBundle,
  makeSelectIsBundlePublished,
  makeSelectError,
  makeSelectBundleID,
} from './selectors';
import verifyTokenAction from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './robot.css';

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
 * Robot page
 * @param {boolean} isVerifyingToken - States whether the verification is in progress
 * @param {boolean} isPublishingBundle - States whether the bundle is getting published
 * @param {boolean} isBundlePublished - States whether the bundle is published
 * @param {number} bundleID - ID received for the bundle after publishing
 * @param {string} error - Errors received while performing any API calls
 * @param {function} verifyToken - Redux action to initiate verification of the token (ReCAPTCHA)
 */
function Robot({
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

Robot.propTypes = propTypes;
Robot.defaultProps = defaultProps;

const mapStateToProps = createStructuredSelector({
  isVerifyingToken: makeSelectIsVerifyingToken(),
  isPublishingBundle: makeSelectIsPublishingBundle(),
  isBundlePublished: makeSelectIsBundlePublished(),
  bundleID: makeSelectBundleID(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    verifyToken: token => dispatch(verifyTokenAction(token)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'robot', reducer });
const withSaga = injectSaga({ key: 'robot', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Robot);

export { mapDispatchToProps, Robot as RobotComponent };
