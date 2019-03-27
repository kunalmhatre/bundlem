/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Footer';

export default defineMessages({
  source: {
    id: `${scope}.source`,
    defaultMessage: 'source',
  },
  reportIssue: {
    id: `${scope}.reportIssue`,
    defaultMessage: 'REPORT ISSUE',
  },
  story: {
    id: `${scope}.story`,
    defaultMessage: 'STORY',
  },
  author: {
    id: `${scope}.author`,
    defaultMessage: 'AUTHOR',
  },
});
