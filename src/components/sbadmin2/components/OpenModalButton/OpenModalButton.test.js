import OpenModalButton from './OpenModalButton';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

it('OpenModalButton', async () => {
  const Button = props => <button {...props} />;
  const Content = () => <div data-testid="content" />;

  const { queryByTestId, getByTestId, queryByRole } = render(
    <OpenModalButton button={Button} modalContent={Content} />
  );

  expect(queryByTestId('content')).not.toBeTruthy();
  expect(queryByRole('button')).toBeTruthy();

  fireEvent.click(queryByRole('button'));

  expect(getByTestId('content')).toBeTruthy();
  expect(getByTestId('content')).toBeVisible();
});
