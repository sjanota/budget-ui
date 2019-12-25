import PropTypes from 'prop-types';
import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { withDictionary } from '../../language';

function LinkBreadcrumb({ text, ...props }) {
  return (
    <li className='breadcrumb-item'>
      <Link {...props}>{text}</Link>
    </li>
  );
}

const BreadcrumbItem = withDictionary('text', LinkBreadcrumb);

function PageHeader({ children, title, actions, breadcrumbs }) {
  return (
    <>
      <h1 className='h3 text-gray-800 d-flex justify-content-between'>
        <span>
          {title}
          {actions}
        </span>
        {children && <div>{children}</div>}
      </h1>
      <Breadcrumb listProps={{ className: 'bg-transparent pl-0 pt-0' }}>
        {breadcrumbs &&
          breadcrumbs.map(b => <BreadcrumbItem as={Link} key={b.to} {...b} />)}
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withDictionary('title', PageHeader);
