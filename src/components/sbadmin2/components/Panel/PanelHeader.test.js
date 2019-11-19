import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import PanelHeader from './PanelHeader';

describe('PanelHeader', () => {
  it('render with minimal props', () => {
    const component = renderer.create(<PanelHeader />);
    expect(component).toMatchSnapshot();
  });

  it('renders children', () => {
    const component = mount(
      <PanelHeader>
        <div id="my-div" />
      </PanelHeader>
    );
    expect(component.find('#my-div')).toExist();
  });
});
