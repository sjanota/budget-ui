import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import Panel from '../sbadmin2/components/Panel/Panel';
import { Collapse } from 'react-bootstrap';
import { Icon } from '../sbadmin2';

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

function CollapsiblePanelHeader(props) {
  const { toggle } = useContext(CollapsibleContext);
  return <Panel.Header onClick={() => toggle()} {...props} />;
}
CollapsiblePanel.Header = CollapsiblePanelHeader;

function CollapsiblePanelTitle({ children, ...props }) {
  const { show } = useContext(CollapsibleContext);
  return (
    <Panel.Title {...props}>
      <Icon icon={show ? Icon.ChevronUp : Icon.ChevronDown} />
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
