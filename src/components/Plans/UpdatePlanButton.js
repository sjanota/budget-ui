import { faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import React from 'react';

import { useUpdatePlan } from '../gql/plans';
import { IconButton, OpenModalButton, useDictionary } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';
import { PlanModal } from './PlanModal';

export function UpdatePlanButton({ plan }) {
  const [updatePlan] = useUpdatePlan();
  const { plans } = useDictionary();
  return (
    <OpenModalButton
      button={props => (
        <IconButton
          icon={faEdit}
          variant={Variant.primary}
          borderless
          {...props}
        />
      )}
      modalContent={props => (
        <PlanModal
          init={plan}
          title={plans.modal.editTitle}
          onSave={input => updatePlan(plan.id, input)}
          {...props}
        />
      )}
    />
  );
}

UpdatePlanButton.propTypes = {
  plan: PropTypes.shape({ id: PropTypes.any.isRequired }).isRequired,
};
