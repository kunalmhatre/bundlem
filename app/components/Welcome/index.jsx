import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'antd';

import PageLayout from '../PageLayout';
import Button from '../Button';
import BundleCard from '../BundleCard';
import messages from './messages';
import './welcome.css';

function Welcome() {
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
            <Button text={messages.createButton} />
            <Button
              text={messages.searchButton}
              highlight={false}
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
                    bundleID={1}
                    bundleTitle={messages.firstFeaturedBundleTitle.defaultMessage}
                    resourcesCount={10}
                  />
                </Col>
                <Col {...responsiveFeaturedBundle}>
                  <BundleCard
                    bundleID={2}
                    bundleTitle={messages.secondFeaturedBundleTitle.defaultMessage}
                    resourcesCount={13}
                  />
                </Col>
              </Row>
            </div>
            <div className="welcome-featured-bundles-sm">
              <Row>
                <Col>
                  <BundleCard
                    bundleID={1}
                    bundleTitle={messages.firstFeaturedBundleTitle.defaultMessage}
                    resourcesCount={10}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <BundleCard
                    bundleID={2}
                    bundleTitle={messages.secondFeaturedBundleTitle.defaultMessage}
                    resourcesCount={13}
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

export default React.memo(Welcome);
