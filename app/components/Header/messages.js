/*
 * Header Messages
 *
 * This contains all the text for the Header component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Header';

export default defineMessages({
  defaultHeaderTitle: {
    id: `${scope}.defaultHeaderTitle`,
    defaultMessage: 'Bundlem',
    description: 'Name of the application',
  },
});
