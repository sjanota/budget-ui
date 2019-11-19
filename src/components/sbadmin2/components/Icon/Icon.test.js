import React from 'react';
import renderer from 'react-test-renderer';
import Icon from './Icon';

it('Icon renders with minimal props', () => {
  const component = renderer.create(<Icon icon={Icon.Archive} />);
  expect(component).toMatchSnapshot();
});
