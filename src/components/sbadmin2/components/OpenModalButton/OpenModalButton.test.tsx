import { render } from '@testing-library/react';
import React from 'react';

import OpenModalButton from './OpenModalButton';

it('OpenModalButton', async () => {
  const Button = (props: object) => <button {...props} />;
  const Content = () => <div data-testid='content' />;

  const { queryByTestId, getByTestId, getByRole } = render(
    <OpenModalButton button={Button} modalContent={Content} />
  );

  expect(queryByTestId('content')).not.toBeTruthy();

  getByRole('button').click();

  expect(getByTestId('content')).toBeVisible();
});
