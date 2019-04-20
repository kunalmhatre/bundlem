/*
 * Bundle Messages
 *
 * This contains all the text for the Bundle container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Bundle';

export default defineMessages({
  searchBundle: {
    id: `${scope}.searchBundle`,
    defaultMessage: 'Search Bundle',
  },
  view: {
    id: `${scope}.view`,
    defaultMessage: 'VIEW',
  },
  bundleIDInputLabel: {
    id: `${scope}.bundleIDInputLabel`,
    defaultMessage: 'BUNDLE ID',
  },
  bundleIDInputPlaceholder: {
    id: `${scope}.bundleIDInputPlaceholder`,
    defaultMessage: 'Enter your Bundle ID',
  },
  fetchingBundle: {
    id: `${scope}.fetchingBundle`,
    defaultMessage: 'Fetching Bundle',
  },
  errorBundleIDInvalid: {
    id: `${scope}.errorBundleIDInvalid`,
    defaultMessage: 'Please enter valid Bundle ID',
  },
  errorBundleIDEmpty: {
    id: `${scope}.errorBundleIDEmpty`,
    defaultMessage: 'Please enter the Bundle ID',
  },
  error400: {
    id: `${scope}.error400`,
    defaultMessage: 'Invalid Bundle ID',
  },
  error404: {
    id: `${scope}.error404`,
    defaultMessage: 'Bundle not found',
  },
  error500: {
    id: `${scope}.error500`,
    defaultMessage: 'Server not responding',
  },
  errorDefault: {
    id: `${scope}.errorDefault`,
    defaultMessage: 'Something went wrong!',
  },
});
