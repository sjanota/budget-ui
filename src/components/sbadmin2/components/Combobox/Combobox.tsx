import './Combobox.css';

import classnames from 'classnames';
import React, {
  ButtonHTMLAttributes,
  ChangeEvent,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button, Dropdown, FormControl, InputGroup } from 'react-bootstrap';

import { Variant } from '../../bootstrap.typed';

interface Props {
  disabled?: boolean;
  allowedValues: { id: string; label: string }[];
  _ref?: { current: any };
  defaultValue?: string;
  className?: string;
  required?: boolean;
  'aria-label': string;
  variant?: Variant;
  prependLabel?: string;
}

export default function Combobox({
  disabled,
  allowedValues,
  _ref,
  defaultValue: defaultID,
  className,
  required,
  'aria-label': ariaLabel,
  variant = 'secondary',
  prependLabel,
}: Props) {
  function valueByID(id: string) {
    return allowedValues.find(v => v.id === id);
  }

  const valueByLabel = useCallback(
    label => allowedValues.find(v => v.label === label),
    [allowedValues]
  );

  const [show, setShow] = useState(false);

  const defaultValue = defaultID ? valueByID(defaultID) : { label: '' };
  const [filter, setFilter] = useState(defaultValue ? defaultValue.label : '');

  const dropdownRef = useRef<HTMLDivElement>();

  const filtered = filter
    ? allowedValues.filter(v =>
        v.label.toLowerCase().includes(filter.toLowerCase())
      )
    : allowedValues;

  useEffect(() => {
    if (_ref) {
      _ref.current = { value: defaultID };
    }
  }, [_ref, defaultID]);

  useEffect(() => {
    function isClickedInside(event: MouseEvent) {
      return (
        !dropdownRef.current ||
        dropdownRef.current!.contains(event.target as Node)
      );
    }

    function handleClickOutside(event: MouseEvent) {
      if (isClickedInside(event)) {
        return;
      }
      setShow(false);
      if (!valueByLabel(filter)) {
        setFilter('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filter, valueByLabel]);

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const label = e.target.value;
    setFilter(label);
    const selected = valueByLabel(label);
    if (selected && _ref) {
      _ref.current = { value: selected.id };
    } else {
      setShow(true);
    }
  }

  function onClick(id: string) {
    const selected = valueByID(id);
    if (selected) {
      setFilter(selected.label);
    }
    if (_ref) {
      _ref.current = { value: id };
    }
  }

  return (
    <Dropdown
      // @ts-ignore
      ref={dropdownRef}
      show={show}
      onToggle={isOpen => {
        setShow(isOpen);
      }}
      className={classnames('combobox', className)}
    >
      <Dropdown.Toggle
        // @ts-ignore
        as={Toggle}
      >
        {({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
          <>
            <FormControl
              value={filter}
              type='text'
              onChange={onInputChange}
              disabled={disabled}
              required={required}
              aria-label={ariaLabel}
            />
            <Button
              variant={variant}
              className={classnames(
                'dropdown-toggle-split',
                'no-arrow',
                className
              )}
              tabIndex={-1}
              disabled={disabled}
              type='button'
              {...props}
            />
          </>
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {filtered.map(v => (
          <Dropdown.Item
            eventKey={v.id}
            key={v.id}
            onClick={() => onClick(v.id)}
          >
            {v.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

interface ToggleProps {
  children(props: object): ReactNode;
}

const Toggle = forwardRef(({ children, ...props }: ToggleProps, ref) => {
  return (
    <InputGroup
      // @ts-ignore
      ref={ref}
    >
      {children(props)}
    </InputGroup>
  );
});
