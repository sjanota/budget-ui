import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Panel from '../sbadmin2/components/Panel/Panel';
import { Collapse } from 'react-bootstrap';
import { Icon } from '../sbadmin2';
import './CollapsiblePanel.css';

const CollapsibleContext = createContext();

export function CollapsiblePanel({ initialyShown, ...props }) {
  const [show, setShow] = useState(initialyShown);
  return (
    <CollapsibleContext.Provider
      value={{ show, toggle: () => setShow(s => !s) }}
    >
      <Panel {...props} />
    </CollapsibleContext.Provider>
  );
}

CollapsiblePanel.propTypes = {
  initialyShown: PropTypes.bool,
};
CollapsiblePanel.defaultProps = {
  initialyShown: false,
};

function CollapsiblePanelHeader({ className, ...props }) {
  const { toggle } = useContext(CollapsibleContext);
  const classNames = classnames('collapsible-panel__header', className);
  return (
    <Panel.Header onClick={() => toggle()} className={classNames} {...props} />
  );
}
CollapsiblePanelHeader.propTypes = {
  className: PropTypes.string,
};
CollapsiblePanel.Header = CollapsiblePanelHeader;

function CollapsiblePanelTitle({ children, ...props }) {
  const { show } = useContext(CollapsibleContext);
  return (
    <Panel.Title {...props}>
      <Icon
        icon={show ? Icon.ChevronUp : Icon.ChevronDown}
        className="text-secondary mr-2"
      />
      {children}
    </Panel.Title>
  );
}
CollapsiblePanelTitle.propTypes = {
  children: PropTypes.node,
};
CollapsiblePanel.Title = CollapsiblePanelTitle;

function CollapsiblePanelBody(props) {
  const { show } = useContext(CollapsibleContext);
  return (
    <Collapse in={show}>
      <Panel.Body {...props} />
    </Collapse>
  );
}
CollapsiblePanel.Body = CollapsiblePanelBody;
