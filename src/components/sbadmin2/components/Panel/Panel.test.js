import { render } from '@testing-library/react';
import React from 'react';

import Panel from './Panel';

describe('Panel', () => {
  it('renders its children', () => {
    const { queryByText } = render(
      <Panel>
        <Panel.Title title='Title' />
        <Panel.Header>Header</Panel.Header>
        <Panel.Body>Body</Panel.Body>
      </Panel>
    );
    expect(queryByText('Title')).toBeTruthy();
    expect(queryByText('Header')).toBeTruthy();
    expect(queryByText('Body')).toBeTruthy();
  });
});
