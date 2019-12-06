import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import React from 'react';

import { useCloseCurrentMonth } from '../gql/budget';
import { SplitButton, useDictionary } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';

export function StartNextMonthButton({ disabled, warn }) {
  const [closeCurrentMonth] = useCloseCurrentMonth();
  const { dashboard } = useDictionary();
  return (
    <SplitButton
      icon={faClipboardCheck}
      variant={
        disabled ? Variant.secondary : warn ? Variant.warning : Variant.success
      }
      disabled={disabled}
      onClick={() => closeCurrentMonth()}
    >
      {dashboard.buttons.closeMonth}
    </SplitButton>
  );
}

StartNextMonthButton.propTypes = {
  disabled: PropTypes.bool,
  warn: PropTypes.bool,
};
