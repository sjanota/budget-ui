import React from 'react';
import PropTypes from 'prop-types';

export default function Icon({ icon }) {
  return <i className={`fas fa-${icon} fa-fw`} />;
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

Icon.Archive = 'archive';
Icon.Trash = 'trash-alt';
Icon.Edit = 'edit';
Icon.Plus = 'plus';
Icon.Minus = 'minus';
Icon.Save = 'save';
