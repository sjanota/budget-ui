import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import PageHeader from './PageHeader';
import { DictionaryContext } from '../../language';

describe('PageHeader', () => {
  it('uses provided with title', () => {
    const component = mount(<PageHeader title="My page" />);
    expect(component).toHaveText('My page');
  });

  it('reads title from dictionary', () => {
    const component = mount(
      <DictionaryContext.Provider value={{ title: 'My page' }}>
        <PageHeader readTitle={d => d.title} />
      </DictionaryContext.Provider>
    );
    expect(component).toHaveText('My page');
  });

  it('renders with minimal props', () => {
    const component = renderer.create(<PageHeader title="" />);
    expect(component).toMatchSnapshot();
  });
});
