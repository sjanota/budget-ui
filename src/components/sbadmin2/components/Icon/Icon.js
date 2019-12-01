import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function Icon({ icon, className }) {
  const classNames = classnames('fas', `fa-${icon}`, 'fa-fw', className);
  return <i className={classNames} />;
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
