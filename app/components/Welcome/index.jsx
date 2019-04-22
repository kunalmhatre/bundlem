import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import PageLayout from '../PageLayout';
import Button from '../Button';
import BundleCard from '../BundleCard';
import messages from './messages';
import './welcome.css';

const propTypes = {
  intl: intlShape.isRequired,
};

/**
 * Welcome component
 */
function Welcome({
  /* eslint-disable react/prop-types */
  history,
  intl, // react-intl prop
}) {
  const helmetTitleFM = intl.formatMessage(messages.helmetTitle);
  const descriptionFM = intl.formatMessage(messages.description);
  const responsiveDescription = {
    xs: 24,
    sm: 22,
    md: 18,
    xl: 10,
    xxl: 8,
  };
  const responsiveFeaturedBundle = {
    md: 10,
    xl: 8,
    xxl: 6,
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{helmetTitleFM}</title>
        <meta name="description" content={descriptionFM} />
      </Helmet>
      <PageLayout setHeader={false}>
        <div className="welcome">
          <Row>
            <Col className="welcome-logo">
              <FormattedMessage {...messages.bundlem} />
            </Col>
          </Row>
          <Row>
            <Col className="welcome-headline">
              <FormattedMessage {...messages.headLine} />
            </Col>
          </Row>
          <Row>
            <Col
              className="welcome-description"
              {...responsiveDescription}
            >
              <FormattedMessage {...messages.description} />
            </Col>
          </Row>
          <Row>
            <Col className="welcome-buttons">
              <Button
                className="welcome-create-button"
                text={messages.createButton}
                onClick={() => history.push('/create')}
              />
              <Button
                text={messages.searchButton}
                highlight={false}
                onClick={() => history.push('/bundle/search')}
              />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <div className="welcome-featured-bundles">
                <FormattedMessage {...messages.featuredBundles} />
              </div>
              <div className="welcome-featured-bundles-lg">
                <Row>
                  <Col {...responsiveFeaturedBundle}>
                    <BundleCard
                      bundleID={57}
                      bundleTitle={messages.firstFeaturedBundleTitle.defaultMessage}
                      resourcesCount={7}
                    />
                  </Col>
                  <Col {...responsiveFeaturedBundle}>
                    <BundleCard
                      bundleID={60}
                      bundleTitle={messages.secondFeaturedBundleTitle.defaultMessage}
                      resourcesCount={6}
                    />
                  </Col>
                </Row>
              </div>
              <div className="welcome-featured-bundles-sm">
                <Row>
                  <Col>
                    <BundleCard
                      bundleID={57}
                      bundleTitle={messages.firstFeaturedBundleTitle.defaultMessage}
                      resourcesCount={7}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <BundleCard
                      bundleID={60}
                      bundleTitle={messages.secondFeaturedBundleTitle.defaultMessage}
                      resourcesCount={6}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </PageLayout>
    </React.Fragment>
  );
}

Welcome.propTypes = propTypes;

export default compose(
  React.memo,
  withRouter,
  injectIntl,
)(Welcome);

const WelcomeComponent = injectIntl(Welcome);

export { WelcomeComponent };
