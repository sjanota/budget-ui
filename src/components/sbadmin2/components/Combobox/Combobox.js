import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Dropdown } from 'react-bootstrap';

export default function Combobox({
  disabled,
  allowedValues,
  _ref,
  defaultValue: defaultID,
  className,
  required,
  'aria-label': ariaLabel,
}) {
  function valueByID(id) {
    return allowedValues.find(v => v.id === id);
  }

  const valueByLabel = useCallback(
    label => allowedValues.find(v => v.label === label),
    [allowedValues]
  );

  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState(
    defaultID ? valueByID(defaultID).label : ''
  );

  const dropdownRef = useRef();

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
    function isClickedInside(event) {
      return !dropdownRef.current || dropdownRef.current.contains(event.target);
    }

    function handleClickOutside(event) {
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

  function onInputChange(e) {
    const label = e.target.value;
    setFilter(label);
    const selected = valueByLabel(label);
    if (selected && _ref) {
      _ref.current = { value: selected.id };
    } else {
      setShow(true);
    }
  }

  function onClick(id) {
    const selected = valueByID(id);
    setFilter(selected.label);
    if (_ref) {
      _ref.current = { value: id };
    }
  }

  return (
    <Dropdown
      ref={dropdownRef}
      show={show}
      onToggle={isOpen => {
        setShow(isOpen);
      }}
    >
      <Dropdown.Toggle as={Toggle} className={className}>
        {props => (
          <>
            <input
              className='form-control'
              value={filter}
              type='text'
              onChange={onInputChange}
              disabled={disabled}
              required={required}
              aria-label={ariaLabel}
            />
            <button
              className='btn btn-secondary dropdown-toggle dropdown-toggle-split no-arrow'
              style={{
                maxWidth: '2rem',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                margin: -1,
              }}
              tabIndex={-1}
              disabled={disabled}
              type='button'
              {...props}
            />
          </>
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
        }}
      >
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

Combobox.propTypes = {
  _ref: PropTypes.shape({ current: PropTypes.any }),
  allowedValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.any,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

const Toggle = forwardRef(({ className, children, ...props }, ref) => {
  const classNames = classnames('combobox', 'input-group', className);

  return (
    <div className={classNames.replace('dropdown-toggle', '')} ref={ref}>
      {children(props)}
    </div>
  );
});
