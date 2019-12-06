import { render } from '@testing-library/react';
import React from 'react';

import { DictionaryContext } from '../../language';
import PageHeader from './PageHeader';

describe('PageHeader', () => {
  it('renders provided title', () => {
    const { queryByText } = render(<PageHeader title='My page' />);
    expect(queryByText('My page')).toBeTruthy();
  });

  it('renders title from dictionary', () => {
    const { queryByText } = render(
      <DictionaryContext.Provider value={{ title: 'My page' }}>
        <PageHeader readTitle={d => d.title} />
      </DictionaryContext.Provider>
    );
    expect(queryByText('My page')).toBeTruthy();
  });
});
