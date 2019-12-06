import React from 'react';

import CreateButton from '../common/CreateButton';
import { useCreatePlan } from '../gql/plans';
import { OpenModalButton, useDictionary } from '../sbadmin2';
import { PlanModal } from './PlanModal';

export function CreatePlanButton() {
  const [createPlan] = useCreatePlan();
  const { plans } = useDictionary();
  return (
    <OpenModalButton
      button={props => <CreateButton {...props} />}
      modalContent={props => (
        <PlanModal
          init={{
            title: null,
            fromEnvelope: { id: null },
            toEnvelope: { id: null },
            currentAmount: null,
            recurringAmount: null,
            date: null,
          }}
          title={plans.modal.createTitle}
          onSave={createPlan}
          {...props}
        />
      )}
    />
  );
}
