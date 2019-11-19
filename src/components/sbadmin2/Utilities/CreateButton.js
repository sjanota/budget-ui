import React from 'react';
import SplitButton from '../components/SplitButton/SplitButton';
import PropTypes from 'prop-types';
import { useDictionary } from '../language';
import Icon from '../components/Icon/Icon';
import { Size } from '../bootstrap';

export default function CreateButton({ onClick }) {
  const { buttons } = useDictionary();
  return (
    <SplitButton icon={Icon.Plus} size={Size.sm} onClick={onClick}>
      {buttons.create}
    </SplitButton>
  );
}

CreateButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
