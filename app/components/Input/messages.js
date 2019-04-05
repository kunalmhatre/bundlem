/*
 * Input Messages
 *
 * This contains all the text for the Input component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Input';

export default defineMessages({
  defaultLabel: {
    id: `${scope}.defaultLabel`,
    defaultMessage: 'Default Label',
  },
  defaultPlaceholder: {
    id: `${scope}.defaultPlaceholder`,
    defaultMessage: 'Default Placeholder',
  },
  defaultErrorMessage: {
    id: `${scope}.defaultErrorMessage`,
    defaultMessage: 'Default Error Message',
  },
});
