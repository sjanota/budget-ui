import React from 'react';
import SplitButton from '../components/SplitButton/SplitButton';
import PropTypes from 'prop-types';
import { useDictionary } from '../language';
import { Size } from '../bootstrap';
import Icon from '../components/Icon/Icon';

export default function SaveButton(props) {
  const { buttons } = useDictionary();

  return (
    <SplitButton icon={Icon.Save} size={Size.sm} {...props}>
      {buttons.save}
    </SplitButton>
  );
}

SaveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
