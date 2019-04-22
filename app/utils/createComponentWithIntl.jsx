/**
 * Renders component with react-intl support for snapshot testing
 * Source: https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#helper-function-2
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';

const createComponentWithIntl = (children, props = { locale: 'en' }) => renderer.create(
  <IntlProvider {...props}>
    {children}
  </IntlProvider>,
);

export default createComponentWithIntl;
