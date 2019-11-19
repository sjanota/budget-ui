import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Panel from './Panel';
import PanelHeader from './PanelHeader';
import PanelTitle from './PanelTitle';
import PanelBody from './PanelBody';

describe('Panel', () => {
  it('render with minimal props', () => {
    const component = renderer.create(<Panel />);
    expect(component).toMatchSnapshot();
  });

  it('renders its children', () => {
    const component = mount(
      <Panel>
        <div id="my-div" />
      </Panel>
    );
    expect(component.find('#my-div')).toExist();
  });

  it('contains references to subcomponents', () => {
    const component = mount(
      <Panel>
        <Panel.Title title="" />
        <Panel.Header />
        <Panel.Body />
      </Panel>
    );
    expect(component.find(PanelHeader)).toExist();
    expect(component.find(PanelTitle)).toExist();
    expect(component.find(PanelBody)).toExist();
  });
});
