import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Tooltip } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import { resetCreateDomainAction } from '../../containers/Create/actions';
import { resetMakeDomainAction } from '../../containers/Make/actions';
import { resetRobotDomainAction } from '../../containers/Robot/actions';
import Button from '../Button';
import PageLayout from '../PageLayout';
import messages from './messages';
import './publish.css';

const propTypes = {
  resetCreateDomain: PropTypes.func.isRequired,
  resetMakeDomain: PropTypes.func.isRequired,
  resetRobotDomain: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

/**
 * Publish component
 * @param {function} resetCreateDomain - Redux action to reset create domain
 * @param {function} resetMakeDomain - Redux action to reset make domain
 * @param {function} resetRobotDomain - Redux action to reset robot domain
 */
function Publish({
  resetCreateDomain,
  resetMakeDomain,
  resetRobotDomain,
  /* eslint-disable react/prop-types */ // react-router-dom props
  history,
  location,
  intl, // react-intl prop
}) {
  const helmetTitleFM = intl.formatMessage(messages.helmetTitle);
  const helmetDescriptionFM = intl.formatMessage(messages.helmetDescription);

  // Reset state data of Create, Make, and Robot domains
  resetCreateDomain();
  resetMakeDomain();
  resetRobotDomain();

  return (
    <React.Fragment>
      <Helmet>
        <title>{helmetTitleFM}</title>
        <meta name="description" content={helmetDescriptionFM} />
      </Helmet>
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
    </React.Fragment>
  );
}

Publish.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return {
    resetCreateDomain: () => dispatch(resetCreateDomainAction()),
    resetMakeDomain: () => dispatch(resetMakeDomainAction()),
    resetRobotDomain: () => dispatch(resetRobotDomainAction()),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
  withRouter,
  injectIntl,
)(Publish);

const PublishComponent = injectIntl(Publish);

export { PublishComponent, mapDispatchToProps };
