import { faArchive } from '@fortawesome/free-solid-svg-icons';
import { render } from '@testing-library/react';
import React from 'react';

import { Variant } from '../../bootstrap';
import ClickableIcon from './ClickableIcon';

describe('ClickableIcon', () => {
  it('renders properly', () => {
    const label = 'my button';
    const onClick = jest.fn();
    const { getByLabelText, getByRole } = render(
      <ClickableIcon
        icon={faArchive}
        variant={Variant.primary}
        aria-label={label}
        onClick={onClick}
      />
    );

    const button = getByLabelText(label);
    button.click();
    expect(onClick).toHaveBeenCalled();
    expect(button).toHaveClass('text-primary');

    const icon = getByRole('img', { hidden: true });
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).toHaveClass('fa-archive');
  });
});
