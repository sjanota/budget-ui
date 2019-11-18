import React from 'react';
import renderer from 'react-test-renderer';
import { Page } from './Page';

it('Page renders with minimal props', () => {
  const component = renderer.create(
    <Page>
      <Page.Header title="My page" />
      <p>content</p>
      <p>and more content</p>
    </Page>
  );
  expect(component).toMatchSnapshot();
});
