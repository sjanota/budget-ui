import React from 'react';
import classnames from 'classnames';
import { withDictionary } from '../language';

export function Panel({ children, className }) {
  return (
    <div className={classnames('card', 'shadow', 'mb-4', className)}>
      {children}
    </div>
  );
}

Panel.Title = function({ title }) {
  return <h6 className="m-0 font-weight-bold text-primary">{title}</h6>;
};

Panel.Title.Dict = withDictionary('title', Panel.Title);

Panel.TitlewithButtons = function({ title, children }) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <Panel.Title title={title} />
      <div>{children}</div>
    </div>
  );
};

Panel.Header = function({ className, children }) {
  return <div className={classnames(className, 'card-header')}>{children}</div>;
};

Panel.Body = function({ children, className }) {
  return <div className={classnames(className, 'card-body')}>{children}</div>;
};
