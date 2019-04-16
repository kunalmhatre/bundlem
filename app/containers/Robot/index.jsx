import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import RobotContent from './RobotContent';
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
  return (
    <RobotContent // Redundant component
      isVerifyingToken={isVerifyingToken}
      isPublishingBundle={isPublishingBundle}
      isBundlePublished={isBundlePublished}
      bundleID={bundleID}
      error={error}
      verifyToken={verifyToken}
    />
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

export { mapDispatchToProps };
