import { jsxAttribute } from '@babel/types';
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import { render } from '@testing-library/react';
import React from 'react';

import { Size, Variant } from '../../bootstrap.typed';
import SplitButton from './SplitButton';

describe('SplitButton', () => {
  it('renders properly', () => {
    const onClick = jest.fn();
    const { getByLabelText, queryByText, getByRole } = render(
      <SplitButton onClick={onClick} icon={faArchive} variant={Variant.danger}>
        Text
      </SplitButton>
    );

    expect(queryByText('Text')).toBeTruthy();

    const button = getByLabelText('Text');
    expect(button).toHaveClass('btn-danger');

    button.click();
    expect(onClick).toHaveBeenCalled();

    const icon = getByRole('img', { hidden: true });
    expect(icon).toHaveClass('fa-archive');
  });

  it('renders when disabled', () => {
    const { getByLabelText } = render(
      <SplitButton icon={faArchive} variant={Variant.danger} disabled>
        Text
      </SplitButton>
    );

    const button = getByLabelText('Text');
    expect(button).toHaveClass('disabled');
    expect(button).toBeDisabled();
  });

  it('renders with non-default size', () => {
    const { getByLabelText } = render(
      <SplitButton icon={faArchive} variant={Variant.danger} size={Size.lg}>
        Text
      </SplitButton>
    );

    const button = getByLabelText('Text');
    expect(button).toHaveClass('btn-lg');
  });
});
