import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { removeFromListByID } from '../../util/immutable';
import { useBudget } from './budget';
import { GET_ENVELOPES } from './envelopes';
import { GET_MONTHLY_REPORT } from './monthlyReport';

const PLAN_FRAGMENT = gql`
  fragment Plan on Plan {
    id
    title
    fromEnvelope {
      id
      name
    }
    toEnvelope {
      id
      name
    }
    currentAmount
    recurringAmount
  }
`;

export const GET_CURRENT_PLANS = gql`
  query getCurrentPlans($budgetID: ID!) {
    budget(budgetID: $budgetID) {
      currentMonth {
        plans {
          ...Plan
        }
      }
    }
  }
  ${PLAN_FRAGMENT}
`;

export function useGetCurrentPlans() {
  const { selectedBudget } = useBudget();
  return useQuery(GET_CURRENT_PLANS, {
    variables: { budgetID: selectedBudget.id },
  });
}

const CREATE_PLAN = gql`
  mutation createPlan($budgetID: ID!, $input: PlanInput!) {
    createPlan(budgetID: $budgetID, in: $input) {
      ...Plan
    }
  }
  ${PLAN_FRAGMENT}
`;

export function useCreatePlan() {
  const { selectedBudget } = useBudget();
  const [mutation, ...rest] = useMutation(CREATE_PLAN, {
    update: (cache, { data: { createPlan } }) => {
      const { budget } = cache.readQuery({
        query: GET_CURRENT_PLANS,
        variables: { budgetID: selectedBudget.id },
      });
      cache.writeQuery({
        query: GET_CURRENT_PLANS,
        variables: { budgetID: selectedBudget.id },
        data: {
          budget: {
            ...budget,
            currentMonth: {
              ...budget.currentMonth,
              plans: budget.currentMonth.plans.concat([createPlan]),
            },
          },
        },
      });
    },
    refetchQueries: () => [
      { query: GET_ENVELOPES, variables: { budgetID: selectedBudget.id } },
      {
        query: GET_MONTHLY_REPORT,
        variables: {
          budgetID: selectedBudget.id,
          month: selectedBudget.currentMonth.month,
        },
      },
    ],
  });
  const wrapper = input => {
    mutation({ variables: { budgetID: selectedBudget.id, input } });
  };
  return [wrapper, ...rest];
}

const UPDATE_PLAN = gql`
  mutation updatePlan($budgetID: ID!, $id: ID!, $input: PlanUpdate!) {
    updatePlan(budgetID: $budgetID, id: $id, in: $input) {
      ...Plan
    }
  }
  ${PLAN_FRAGMENT}
`;

export function useUpdatePlan() {
  const { selectedBudget } = useBudget();
  const [mutation, ...rest] = useMutation(UPDATE_PLAN, {
    refetchQueries: () => [
      { query: GET_ENVELOPES, variables: { budgetID: selectedBudget.id } },
      {
        query: GET_MONTHLY_REPORT,
        variables: {
          budgetID: selectedBudget.id,
          month: selectedBudget.currentMonth.month,
        },
      },
    ],
  });
  const wrapper = (id, input) => {
    mutation({ variables: { budgetID: selectedBudget.id, id, input } });
  };
  return [wrapper, ...rest];
}

const DELETE_PLAN = gql`
  mutation deletePlan($budgetID: ID!, $id: ID!) {
    deletePlan(budgetID: $budgetID, id: $id) {
      id
    }
  }
`;

export function useDeletePlan() {
  const { selectedBudget } = useBudget();
  const [mutation, ...rest] = useMutation(DELETE_PLAN, {
    update: (cache, { data: { deletePlan } }) => {
      const { budget } = cache.readQuery({
        query: GET_CURRENT_PLANS,
        variables: { budgetID: selectedBudget.id },
      });
      cache.writeQuery({
        query: GET_CURRENT_PLANS,
        variables: { budgetID: selectedBudget.id },
        data: {
          budget: {
            ...budget,
            currentMonth: {
              ...budget.currentMonth,
              plans: removeFromListByID(
                budget.currentMonth.plans,
                deletePlan.id
              ),
            },
          },
        },
      });
    },
    refetchQueries: () => [
      { query: GET_ENVELOPES, variables: { budgetID: selectedBudget.id } },
      {
        query: GET_MONTHLY_REPORT,
        variables: {
          budgetID: selectedBudget.id,
          month: selectedBudget.currentMonth.month,
        },
      },
    ],
  });
  const wrapper = id => {
    mutation({ variables: { budgetID: selectedBudget.id, id } });
  };
  return [wrapper, ...rest];
}
