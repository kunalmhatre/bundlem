import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import BundleContent from './BundleContent';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import {
  makeSelectBundle,
  makeSelectIsFetchingBundle,
  makeSelectError,
} from './selectors';
import {
  setBundleAction,
  fetchBundleAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import './bundle.css';

const propTypes = {
  bundle: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    resources: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        link: PropTypes.string,
        notes: PropTypes.string,
        resourceType: PropTypes.string,
      }),
    ),
  }),
  isFetchingBundle: PropTypes.bool.isRequired,
  error: PropTypes.string,
  setBundle: PropTypes.func.isRequired,
  fetchBundle: PropTypes.func.isRequired,
};

const defaultProps = {
  bundle: null,
  error: null,
};

/**
 * Bundle page
 * @param {object} bundle - Bundle data
 * @param {boolean} isFetchingBundle - States whether the bundle is getting fetched
 * @param {string} error - Errors received while performing the API call
 * @param {function} setBundle -  Redux action to store the bundle in the state
 * @param {function} fetchBundle - Redux action to fetch bundle
 */
function Bundle({
  bundle,
  isFetchingBundle,
  error,
  setBundle,
  fetchBundle,
  /* eslint-disable react/prop-types */ // react-router prop
  location = { search: '' }, // fix for location prop being absent while testing
}) {
  return (
    <BundleContent
      bundle={bundle}
      isFetchingBundle={isFetchingBundle}
      error={error}
      setBundle={setBundle}
      fetchBundle={fetchBundle}
      location={location}
    />
  );
}

Bundle.propTypes = propTypes;
Bundle.defaultProps = defaultProps;

const mapStateToProps = createStructuredSelector({
  bundle: makeSelectBundle(),
  isFetchingBundle: makeSelectIsFetchingBundle(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    setBundle: bundle => dispatch(setBundleAction(bundle)),
    fetchBundle: bundleID => dispatch(fetchBundleAction(bundleID)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'bundle', reducer });
const withSaga = injectSaga({ key: 'bundle', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Bundle);

export { mapDispatchToProps };
