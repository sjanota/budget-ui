import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export default function Icon({ icon, className, ...props }) {
  const classNames = classnames('fas', `fa-${icon}`, 'fa-fw', className);
  return <i className={classNames} {...props} />;
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Icon.Archive = 'archive';
Icon.Trash = 'trash-alt';
Icon.Edit = 'edit';
Icon.Plus = 'plus';
Icon.Minus = 'minus';
Icon.Save = 'save';
Icon.ClipboardCheck = 'clipboard-check';
Icon.ChevronUp = 'chevron-up';
Icon.ChevronDown = 'chevron-down';
