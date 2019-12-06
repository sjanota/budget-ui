import { render } from '@testing-library/react';
import React from 'react';

import Page from './Page';

describe('Page', () => {
  it('renders its children', () => {
    const { queryByText } = render(
      <Page>
        <Page.Header title='My page' />
        <p>content</p>
        <p>and more content</p>
      </Page>
    );
    expect(queryByText('My page')).toBeTruthy();
    expect(queryByText('content')).toBeTruthy();
    expect(queryByText('and more content')).toBeTruthy();
  });
});
