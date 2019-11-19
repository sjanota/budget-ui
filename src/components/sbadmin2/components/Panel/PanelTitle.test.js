import React from 'react';
import renderer from 'react-test-renderer';
import PanelTitle from './PanelTitle';
import { mount } from 'enzyme';
import { DictionaryContext } from '../../language';

describe('PanelTitle', () => {
  it('uses provided with title', () => {
    const component = mount(<PanelTitle title="My page" />);
    expect(component).toHaveText('My page');
  });

  it('reads title from dictionary', () => {
    const component = mount(
      <DictionaryContext.Provider value={{ title: 'My page' }}>
        <PanelTitle readTitle={d => d.title} />
      </DictionaryContext.Provider>
    );
    expect(component).toHaveText('My page');
  });

  it('renders with minimal props', () => {
    const component = renderer.create(<PanelTitle title="" />);
    expect(component).toMatchSnapshot();
  });
});
