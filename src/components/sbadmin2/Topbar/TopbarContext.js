import PropTypes from 'prop-types';
import React from 'react';

function TopbarContextExpanded({ renderContext }) {
  return (
    <form className='d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-context'>
      {renderContext()}
    </form>
  );
}

TopbarContextExpanded.propTypes = {
  renderContext: PropTypes.func.isRequired,
};

function TopbarContextMinimized({ faIcon, renderContext }) {
  return (
    <li className='nav-item dropdown no-arrow d-sm-none'>
      <span
        className='nav-link dropdown-toggle'
        id='contextDropdown'
        role='button'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
        style={{ cursor: 'pointer' }}
      >
        <i className={`fas fa-${faIcon} fa-fw`}></i>
      </span>
      <div
        className='dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in'
        aria-labelledby='contextDropdown'
      >
        <form className='form-inline mr-auto w-100 navbar-context'>
          {renderContext()}
        </form>
      </div>
    </li>
  );
}

TopbarContextMinimized.propTypes = {
  faIcon: PropTypes.string.isRequired,
  renderContext: PropTypes.func.isRequired,
};

export default function TopbarContext({ minified, ...props }) {
  return minified ? (
    <TopbarContextMinimized {...props} />
  ) : (
    <TopbarContextExpanded {...props} />
  );
}

TopbarContext.propTypes = {
  minified: PropTypes.bool,
};
