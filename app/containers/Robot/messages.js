/*
 * Robot Messages
 *
 * This contains all the text for the Robot container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Robot';

export default defineMessages({
  robotPageTitle: {
    id: `${scope}.robotPageTitle`,
    defaultMessage: 'We are afraid of robots',
  },
  verifyingToken: {
    id: `${scope}.verifyingToken`,
    defaultMessage: 'Verifying',
  },
  publishingBundle: {
    id: `${scope}.publishingBundle`,
    defaultMessage: 'Publishing Bundle',
  },
  error400: {
    id: `${scope}.error400`,
    defaultMessage: 'Publishing failed',
  },
  error403: {
    id: `${scope}.error403`,
    defaultMessage: 'Verification failed',
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
