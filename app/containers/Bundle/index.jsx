import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { Row, Col, Icon } from 'antd';
import queryString from 'query-string';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import Form from './Form';
import ResourceList from './ResourceList';
import BundleInfo from '../../components/BundleInfo';
import PageLayout from '../../components/PageLayout';
import messages from './messages';
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
  intl: intlShape.isRequired,
};

const defaultProps = {
  bundle: null,
  error: null,
};

/**
 * Bundle container
 * @param {object} [bundle=null] - Bundle data
 * @param {boolean} isFetchingBundle - States whether the bundle is getting fetched
 * @param {string} [error=null] - Errors received while performing the API call
 * @param {function} setBundle -  Redux action to store the bundle in the state
 * @param {function} fetchBundle - Redux action to fetch bundle
 */
function Bundle({
  bundle,
  isFetchingBundle,
  error,
  setBundle,
  fetchBundle,
  intl, // react-intl prop
  /* eslint-disable react/prop-types */ // react-router prop
  location,
}) {
  const helmetTitleFM = intl.formatMessage(messages.helmetTitle);
  const helmetDescriptionFM = intl.formatMessage(messages.helmetDescription);
  const responsiveContentColumn1 = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 14,
    xxl: 14,
  };

  // Checking if Bundle ID is provided as a URL parameter
  const searchParams = queryString.parse(location.search);
  const [isFetchRequest, setIsFetchRequest] = useState(!!(searchParams.bundleID));

  if (isFetchRequest) {
    fetchBundle(searchParams.bundleID);
    setIsFetchRequest(false);
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{helmetTitleFM}</title>
        <meta name="description" content={helmetDescriptionFM} />
      </Helmet>
      <PageLayout>
        <Row className="bundle-search-form-mobile">
          <Col>
            <Form setBundle={setBundle} />
            <hr />
          </Col>
        </Row>
        <Row className="bundle-resource-content">
          {
            (
              bundle
              || isFetchRequest
              || isFetchingBundle
              || error
            ) ? (
              <Col
                {...responsiveContentColumn1}
                className="bundle-resource-content-column-1"
              >
                {
                  bundle ? (
                    <React.Fragment>
                      <Row>
                        <Col>
                          <BundleInfo
                            bundleTitle={bundle.title}
                            bundleDescription={bundle.description}
                            resourcesCount={bundle.resources.length}
                          />
                        </Col>
                      </Row>
                      <Row className="bundle-resource-content-column-1-row-2">
                        <Col className="bundle-resource-content-column-1-row-2-column-1">
                          <ResourceList resources={bundle.resources} />
                        </Col>
                      </Row>
                    </React.Fragment>
                  ) : (
                    <Row className="bundle-fetching-messages-row">
                      <Col className="bundle-fetching-messages-row-column-1">
                        {
                          isFetchingBundle ? (
                            <div className="bundle-fetching-message">
                              <Icon className="bundle-fetching-loader theme-blue" type="loading" />
                              <FormattedMessage {...messages.fetchingBundle} />
                            </div>
                          ) : (
                            <React.Fragment>
                              {
                                error ? (
                                  <div className="bundle-fetching-error theme-blue-error-message">
                                    <FormattedMessage {...messages[error]} />
                                  </div>
                                ) : null
                              }
                            </React.Fragment>
                          )
                        }
                      </Col>
                    </Row>
                  )
                }
              </Col>
              ) : null
          }
          <Col
            className="bundle-resource-content-column-2"
            span={
              bundle
              || isFetchRequest
              || isFetchingBundle
              || error ? 10 : 24
            }
          >
            <Form setBundle={setBundle} />
          </Col>
        </Row>
      </PageLayout>
    </React.Fragment>
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
  injectIntl,
)(Bundle);

const BundleComponent = injectIntl(Bundle);

export { mapDispatchToProps, BundleComponent };
