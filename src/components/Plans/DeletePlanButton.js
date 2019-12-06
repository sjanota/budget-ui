import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import React from 'react';

import { useDeletePlan } from '../gql/plans';
import { IconButton } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';

export function DeletePlanButton({ plan }) {
  const [deletePlan] = useDeletePlan();
  return (
    <IconButton
      icon={faTrash}
      variant={Variant.secondary}
      onClick={() => deletePlan(plan.id)}
      borderless
    />
  );
}

DeletePlanButton.propTypes = {
  plan: PropTypes.shape({ id: PropTypes.any.isRequired }).isRequired,
};
