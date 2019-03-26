/*
 * Header Messages
 *
 * This contains all the text for the Header component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Header';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Bundlem',
    description: 'Name of the application',
  },
});
