/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NotFoundPage';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Page not found',
  },
  helmetTitle: {
    id: `${scope}.helmetTitle`,
    defaultMessage: '404 - Page not found',
  },
  helmetDescription: {
    id: `${scope}.helmetDescription`,
    defaultMessage: 'Requested page was not found.',
  },
});
