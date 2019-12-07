import PropTypes from 'prop-types';
import React from 'react';

import { Variant } from './bootstrap';

export function Gauge({ className, variant, title, value, faIcon }) {
  return (
    <div className={className}>
      <div className={`card border-left-${variant} shadow h-100 py-2`}>
        <div className='card-body'>
          <div className='row no-gutters align-items-center'>
            <div className='col mr-2'>
              <div
                className={`text-xs font-weight-bold text-${variant} text-uppercase mb-1`}
              >
                {title}
              </div>
              <div className='h5 mb-0 font-weight-bold text-gray-800'>
                {value}
              </div>
            </div>
            <div className='col-auto'>
              <i className={`fas fa-${faIcon} fa-2x text-gray-300`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Gauge.propTypes = {
  className: PropTypes.string.isRequired,
  faIcon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  variant: PropTypes.PropTypes.oneOf(Object.keys(Variant)),
};
