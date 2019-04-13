/*
 * Make Messages
 *
 * This contains all the text for the Make container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Make';

export default defineMessages({
  resource: {
    id: `${scope}.resource`,
    defaultMessage: 'Resource',
  },
  typeInputLabel: {
    id: `${scope}.typeInputLabel`,
    defaultMessage: 'TYPE',
  },
  typeInput1: {
    id: `${scope}.typeInput1`,
    defaultMessage: 'WEB PAGE',
  },
  typeInput2: {
    id: `${scope}.typeInput2`,
    defaultMessage: 'VIDEO',
  },
  typeInput3: {
    id: `${scope}.typeInput3`,
    defaultMessage: 'DOCUMENT',
  },
  typeInput4: {
    id: `${scope}.typeInput4`,
    defaultMessage: 'IMAGE',
  },
  typeInput5: {
    id: `${scope}.typeInput5`,
    defaultMessage: 'OTHER',
  },
  errorTypeInputEmpty: {
    id: `${scope}.errorTypeInputEmpty`,
    defaultMessage: 'Please select a type',
  },
  linkInputLabel: {
    id: `${scope}.linkInputLabel`,
    defaultMessage: 'LINK',
  },
  linkInputPlaceholder: {
    id: `${scope}.linkInputPlaceholder`,
    defaultMessage: 'Enter link',
  },
  errorLinkInputEmpty: {
    id: `${scope}.errorLinkInputEmpty`,
    defaultMessage: 'Please enter the link',
  },
  errorLinkInputInvalid: {
    id: `${scope}.errorLinkInputInvalid`,
    defaultMessage: 'Please enter a valid link',
  },
  titleInputLabel: {
    id: `${scope}.titleInputLabel`,
    defaultMessage: 'TITLE',
  },
  titleInputPlaceholder: {
    id: `${scope}.titleInputPlaceholder`,
    defaultMessage: 'Enter title (Optional)',
  },
  errorTitleInputLength: {
    id: `${scope}.errorTitleInputLength`,
    defaultMessage: 'Exceeds maximum length of 120 characters',
  },
  notesInputLabel: {
    id: `${scope}.notesInputLabel`,
    defaultMessage: 'NOTES',
  },
  notesInputPlaceholder: {
    id: `${scope}.notesInputPlaceholder`,
    defaultMessage: 'Enter notes (Optional)',
  },
  errorNotesInputLength: {
    id: `${scope}.errorNotesInputLength`,
    defaultMessage: 'Exceeds maximum length of 1024 characters',
  },
  bundleUpButton: {
    id: `${scope}.bundleUpButton`,
    defaultMessage: 'BUNDLE UP',
  },
  removeButton: {
    id: `${scope}.removeButton`,
    defaultMessage: 'REMOVE',
  },
});
