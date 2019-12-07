import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';

import { Size, Variant } from '../../bootstrap.typed';

interface Props {
  icon: IconProp;
  variant: Variant;
  size?: Size;
  className?: string;
  disabled?: boolean;
  _ref?: { current: any };
  children?: string;
}

export default function SplitButton({
  icon,
  variant,
  size,
  className,
  disabled,
  _ref,
  children,
  ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classNames = classnames('btn', 'btn-icon-split', className, {
    disabled,
    [`btn-${size}`]: size,
    [`btn-${variant}`]: variant,
  });

  return (
    <button
      className={classNames}
      disabled={disabled}
      ref={_ref}
      aria-label={children}
      {...props}
    >
      <span className='icon text-white-50'>
        <FontAwesomeIcon icon={icon} />
      </span>
      <span className='text'>{children}</span>
    </button>
  );
}
