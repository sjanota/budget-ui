import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import PanelBody from './PanelBody';

describe('PanelBody', () => {
  it('render with minimal props', () => {
    const component = renderer.create(<PanelBody />);
    expect(component).toMatchSnapshot();
  });

  it('renders children', () => {
    const component = mount(
      <PanelBody>
        <div id="my-div" />
      </PanelBody>
    );
    expect(component.find('#my-div')).toExist();
  });
});
