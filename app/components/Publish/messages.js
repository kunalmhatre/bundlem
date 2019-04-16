/*
 * Publish Messages
 *
 * This contains all the text for the Publish component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Publish';

export default defineMessages({
  publishTitle: {
    id: `${scope}.publishTitle`,
    defaultMessage: 'Congrats, your bundle has been published!',
  },
  bundleID: {
    id: `${scope}.bundleID`,
    defaultMessage: 'BUNDLE ID',
  },
  viewButton: {
    id: `${scope}.viewButton`,
    defaultMessage: 'VIEW',
  },
  copyLinkButton: {
    id: `${scope}.copyLinkButton`,
    defaultMessage: 'COPY LINK',
  },
  thankYouMessage: {
    id: `${scope}.thankYouMessage`,
    defaultMessage: 'Thank you for using Bundlem',
  },
  copiedTooltip: {
    id: `${scope}.copiedTooltip`,
    defaultMessage: 'Copied',
  },
});
