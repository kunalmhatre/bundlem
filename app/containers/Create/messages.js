/*
 * Create Messages
 *
 * This contains all the text for the Create container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Create';

export default defineMessages({
  createTitle: {
    id: `${scope}.createTitle`,
    defaultMessage: 'Set a title for your Bundle',
  },
  titleLabel: {
    id: `${scope}.titleLabel`,
    defaultMessage: 'TITLE',
  },
  titlePlaceholder: {
    id: `${scope}.titlePlaceholder`,
    defaultMessage: 'Enter title',
  },
  descriptionLabel: {
    id: `${scope}.descriptionLabel`,
    defaultMessage: 'DESCRIPTION',
  },
  descriptionPlaceholder: {
    id: `${scope}.descriptionPlaceholder`,
    defaultMessage: 'Enter more description (Optional)',
  },
  nextButton: {
    id: `${scope}.nextButton`,
    defaultMessage: 'NEXT',
  },
  errorTitleEmpty: {
    id: `${scope}.errorTitleEmpty`,
    defaultMessage: 'Please enter the title',
  },
  errorTitleLength: {
    id: `${scope}.errorTitleLength`,
    defaultMessage: 'Exceeds maximum length of 120 characters',
  },
  errorDescriptionLength: {
    id: `${scope}.errorDescriptionLength`,
    defaultMessage: 'Exceeds maximum length of 320 characters',
  },
  helmetTitle: {
    id: `${scope}.helmetTitle`,
    defaultMessage: 'Create',
  },
  helmetDescription: {
    id: `${scope}.helmetDescription`,
    defaultMessage: 'Create your bundle of online resources.',
  },
});
