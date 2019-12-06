import { render } from '@testing-library/react';
import React from 'react';

import { DictionaryContext } from '../../language';
import PanelTitle from './PanelTitle';

describe('PanelTitle', () => {
  it('renders provided title', () => {
    const { queryByText } = render(<PanelTitle title='My page' />);
    expect(queryByText('My page')).toBeTruthy();
  });

  it('reads title from dictionary', () => {
    const { queryByText } = render(
      <DictionaryContext.Provider value={{ title: 'My page' }}>
        <PanelTitle readTitle={d => d.title} />
      </DictionaryContext.Provider>
    );
    expect(queryByText('My page')).toBeTruthy();
  });
});
