import './ContextSwitcher.css';

import classNames from 'classnames';
import classnames from 'classnames';
import React, { forwardRef } from 'react';
import { Button, ButtonGroup, Dropdown, InputGroup } from 'react-bootstrap';

export default function ContextSwitcher({
  className,
  allowedValues,
  onChange,
  label,
  value,
  variant,
  displayBg = 'light',
  labelBg,
  showLabel = true,
}) {
  const labelClasses = classnames('border-0', { [`bg-${labelBg}`]: labelBg });

  return (
    <Dropdown
      className={classNames(
        'context-switcher',
        'input-group',
        'align-items-stretch',
        className
      )}
    >
      {showLabel && (
        <InputGroup.Prepend className='context-switcher__label d-flex align-items-stretch'>
          <InputGroup.Text as='label' className={classnames(labelClasses)}>
            {label}
          </InputGroup.Text>
        </InputGroup.Prepend>
      )}

      <Dropdown.Toggle as={Toggle} append={showLabel}>
        {({ className, ...props }) => (
          <>
            <Dropdown.Menu>
              {allowedValues.map(v => (
                <Dropdown.Item onClick={() => onChange(v.id)} key={v.id}>
                  {v.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
            <InputGroup.Text
              className={`bg-${displayBg} border-0 context_switcher__context-display text-dark`}
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

const Toggle = forwardRef(({ children, append, ...props }, ref) => {
  return (
    <ButtonGroup
      className={classnames('context-switcher__toggle-group', {
        'input-group-append': append,
      })}
      ref={ref}
    >
      {children(props)}
    </ButtonGroup>
  );
});
