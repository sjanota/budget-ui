import './ContextSwitcher.css';

import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { Button, ButtonGroup, Dropdown, InputGroup } from 'react-bootstrap';

export default function ContextSwitcher({
  className,
  allowedValues,
  onChange,
  label,
  value,
  variant,
}) {
  return (
    <Dropdown className={classNames('context-switcher', className)}>
      <Dropdown.Menu>
        {allowedValues.map(v => (
          <Dropdown.Item onClick={() => onChange(v.id)} key={v.id}>
            {v.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
      <Dropdown.Toggle as={Toggle}>
        {({ className, ...props }) => (
          <>
            <InputGroup.Text
              className='bg-light border-0 context_switcher__context-display text-dark'
              aria-label={label}
            >
              {value}
            </InputGroup.Text>
            <Button
              variant={variant}
              className={classNames(
                'dropdown-toggle-split no-arrow ',
                className
              )}
              {...props}
            />
          </>
        )}
      </Dropdown.Toggle>
    </Dropdown>
  );
}

const Toggle = forwardRef(({ children, ...props }, ref) => {
  return (
    <ButtonGroup className='context-switcher__toggle-group' ref={ref}>
      {children(props)}
    </ButtonGroup>
  );
});
