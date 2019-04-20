import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Row, Col, Icon } from 'antd';
import queryString from 'query-string';
import { FormattedMessage } from 'react-intl';

import Form from './Form';
import ResourceList from './ResourceList';
import BundleInfo from '../../components/BundleInfo';
import PageLayout from '../../components/PageLayout';
import messages from './messages';

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
 * BundleContent component
 * NOTE: The code for this component belongs in Bundle container and hence
 * this component is redundant. It is created only to make the Bundle container easily testable.
 * @param {object} bundle - Bundle data
 * @param {boolean} isFetchingBundle - States whether the bundle is getting fetched
 * @param {string} error - Errors received while performing the API call
 * @param {function} setBundle -  Redux action to store the bundle
 * @param {function} fetchBundle - Redux action to fetch bundle
 */
function BundleContent({
  bundle,
  isFetchingBundle,
  error,
  setBundle,
  fetchBundle,
  /* eslint-disable react/prop-types */ // react-router prop
  location,
}) {
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
        <title>Bundle</title>
        <meta name="description" content="Description of Bundle" />
      </Helmet>
      <PageLayout>
        <Row className="bundle-search-form-mobile">
          <Col>
            <Form setBundle={setBundle} />
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

BundleContent.propTypes = propTypes;
BundleContent.defaultProps = defaultProps;

export default BundleContent;
