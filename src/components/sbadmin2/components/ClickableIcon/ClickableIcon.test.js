import React from 'react';
import { mount } from 'enzyme';

import ClickableIcon from './ClickableIcon';
import Icon from '../Icon/Icon';
import { Variant } from '../../bootstrap';
import { render } from '@testing-library/react';

it('ClickableIcon renders with minimal properly', () => {
  const { container } = render(
    <ClickableIcon icon={Icon.Archive} variant={Variant.primary} />
  );
  expect(container.firstChild).toMatchSnapshot();
});

describe('ClickableIcon', () => {
  const component = mount(
    <ClickableIcon icon={Icon.Archive} variant={Variant.primary} />
  );

  it('sets proper text-variant class', () => {
    expect(component.find('button')).toHaveClassName('text-primary');
    expect(component.find('button')).toMatchSelector('[className*=" text-"]');
  });

  it('passes icon to Icon', () => {
    expect(component.find(Icon)).toHaveProp('icon', Icon.Archive);
  });

  it('does not set text-variant class if variant is missing', () => {
    const component = mount(<ClickableIcon icon={Icon.Archive} />);
    expect(component.find('button')).not.toMatchSelector(
      '[className*=" text-"]'
    );
    expect(component.find('button')).not.toMatchSelector(
      '[className^="text-"]'
    );
  });
});
