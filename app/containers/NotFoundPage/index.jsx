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
import { FormattedMessage } from 'react-intl';

import PageLayout from '../../components/PageLayout';
import messages from './messages';
import './notfoundpage.css';

/* eslint-disable react/prefer-stateless-function */
export default class NotFound extends React.PureComponent {
  render() {
    return (
      <PageLayout>
        <div className="notfoundpage-alignment">
          <h1 className="notfoundpage-title theme-blue">
            <FormattedMessage {...messages.title} />
          </h1>
        </div>
      </PageLayout>
    );
  }
}
