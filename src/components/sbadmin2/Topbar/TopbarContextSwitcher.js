import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { ReactNode, forwardRef } from 'react';
import { Button, ButtonGroup, Dropdown, InputGroup } from 'react-bootstrap';

export default function TopbarContextSwitcher({
  label,
  value,
  onChange,
  allowedValues,
}) {
  return (
    <div className='input-group navbar-context-switcher'>
      <InputGroup.Prepend className='navbar-context-switcher-label'>
        <InputGroup.Text as='label' className='border-0'>
          {label}
        </InputGroup.Text>
      </InputGroup.Prepend>
      <Dropdown className='input-group-append'>
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
                className='bg-light border-0 navbar-context-display text-dark'
                aria-label={label}
              >
                {value}
              </InputGroup.Text>
              <Button
                variant='primary'
                className={classnames(
                  'dropdown-toggle-split no-arrow',
                  className
                )}
                {...props}
              />
            </>
          )}
        </Dropdown.Toggle>
      </Dropdown>
    </div>
  );
}

TopbarContextSwitcher.propTypes = {
  allowedValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  label: PropTypes.any,
  onChange: PropTypes.any,
  value: PropTypes.any,
};

const Toggle = forwardRef(({ children, ...props }, ref) => {
  return <ButtonGroup ref={ref}>{children(props)}</ButtonGroup>;
});
