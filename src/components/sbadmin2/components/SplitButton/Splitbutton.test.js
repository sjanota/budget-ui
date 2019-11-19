import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import SplitButton from './SplitButton';
import Icon from '../Icon/Icon';
import { Variant, Size } from '../../bootstrap';

it('SplitButton renders with minimal props', () => {
  const component = renderer.create(<SplitButton icon={Icon.Archive} />);
  expect(component).toMatchSnapshot();
});

it('SplitButton renders with all props', () => {
  const component = renderer.create(
    <SplitButton
      icon={Icon.Archive}
      variant={Variant.danger}
      size={Size.lg}
      className="my-class"
      disabled
    >
      Text
    </SplitButton>
  );
  expect(component).toMatchSnapshot();
});

describe('SplitButton', () => {
  describe('when enabled', () => {
    const component = mount(
      <SplitButton
        icon={Icon.Archive}
        variant={Variant.danger}
        size={Size.lg}
        className="my-class"
      >
        Text
      </SplitButton>
    );
    it('passes icon to Icon', () => {
      expect(component.find(Icon)).toHaveProp('icon', Icon.Archive);
    });

    it('sets custom class', () => {
      expect(component.find('button')).toHaveClassName('my-class');
    });

    it('renders children', () => {
      expect(component.find('button')).toHaveText('Text');
    });

    it('sets proper btn-variant class', () => {
      expect(component.find('button')).toHaveClassName('btn-danger');
    });

    it('sets proper btn-size class', () => {
      expect(component.find('button')).toHaveClassName('btn-lg');
    });

    it('does not set disabled class', () => {
      expect(component.find('button')).not.toHaveClassName('disabled');
    });

    it('does not set disabled button prop', () => {
      expect(component.find('button')).toHaveProp('disabled', undefined);
    });
  });

  describe('when disabled', () => {
    const component = mount(<SplitButton icon={Icon.Archive} disabled />);

    it('sets disabled class', () => {
      expect(component.find('button')).toHaveClassName('disabled');
    });

    it('sets disabled button prop', () => {
      expect(component.find('button')).toHaveProp('disabled', true);
    });
  });
});
