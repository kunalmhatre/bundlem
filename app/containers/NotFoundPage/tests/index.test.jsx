import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { mountWithIntl } from '../../../utils/reactIntlHelperFunction';

import NotFoundPage from '../index';
import messages from '../messages';

describe('<NotFoundPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = mountWithIntl(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    );

    expect(
      renderedComponent
        .contains(
          <FormattedMessage {...messages.title} />,
        ),
    ).toEqual(true);
  });
});
