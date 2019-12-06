import './CollapsiblePanel.css';

import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';
import { Collapse } from 'react-bootstrap';

import Panel from '../sbadmin2/components/Panel/Panel';

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
      <span className='text-secondary mr-2'>
        <FontAwesomeIcon icon={show ? faChevronUp : faChevronDown} />
      </span>
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
