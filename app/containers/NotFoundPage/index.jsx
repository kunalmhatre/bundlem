/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Helmet } from 'react-helmet';

import PageLayout from '../../components/PageLayout';
import messages from './messages';
import './notfoundpage.css';

const propTypes = {
  intl: intlShape.isRequired,
};

/**
 * NotFoundPage component
 * Note: This component came with the boilerplate code. (Now converted to SFC)
 */
function NotFoundPage({ intl }) {
  const helmetTitleFM = intl.formatMessage(messages.helmetTitle);
  const helmetDescriptionFM = intl.formatMessage(messages.helmetDescription);

  return (
    <React.Fragment>
      <Helmet>
        <title>{helmetTitleFM}</title>
        <meta name="description" content={helmetDescriptionFM} />
      </Helmet>
      <PageLayout setFooter={false}>
        <div className="notfoundpage-alignment">
          <h1 className="notfoundpage-title theme-blue">
            <FormattedMessage {...messages.title} />
          </h1>
        </div>
      </PageLayout>
    </React.Fragment>
  );
}

NotFoundPage.propTypes = propTypes;

export default injectIntl(NotFoundPage);
