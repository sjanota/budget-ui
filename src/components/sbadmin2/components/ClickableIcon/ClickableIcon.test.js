import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import ClickableIcon from './ClickableIcon';
import Icon from '../Icon/Icon';
import { Variant } from '../../bootstrap';

it('ClickableIcon renders with minimal properly', () => {
  const component = renderer.create(
    <ClickableIcon icon={Icon.Archive} variant={Variant.primary} />
  );
  expect(component).toMatchSnapshot();
});

describe('ClickableIcon', () => {
  const component = mount(
    <ClickableIcon icon={Icon.Archive} variant={Variant.primary} />
  );

  it('sets proper text-variant class', () => {
    expect(component.find('button')).toHaveClassName('text-primary');
  });

  it('passes icon to Icon', () => {
    expect(component.find(Icon)).toHaveProp('icon', Icon.Archive);
  });
});
