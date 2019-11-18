import React from 'react';
import PropTypes from 'prop-types';

export function FaIcon({ icon }) {
  return <i className={`fas fa-${icon} fa-fw`} />;
}

FaIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

FaIcon.Archive = 'archive';
FaIcon.Trash = 'trash-alt';
FaIcon.Edit = 'edit';
FaIcon.Plus = 'plus';
FaIcon.Minus = 'minus';
