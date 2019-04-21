import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';

import PageLayout from '../PageLayout';
import Button from '../Button';
import BundleCard from '../BundleCard';
import messages from './messages';
import './welcome.css';

/**
 * Welcome page
 */
function Welcome({
  /* eslint-disable react/prop-types */
  history,
}) {
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
              onClick={() => history.push('/bundle')}
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
  );
}

export default React.memo(withRouter(Welcome));

export { Welcome as WelcomeComponent };
