import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { removeFromListByID } from '../../util/immutable';
import { GET_ACCOUNTS } from './accounts';
import { useBudget } from './budget';
import { GET_MONTHLY_REPORT } from './monthlyReport';

const TRANSFER_FRAGMENT = gql`
  fragment Transfer on Transfer {
    id
    title
    fromAccount {
      id
      name
    }
    toAccount {
      id
      name
    }
    amount
    date
  }
`;

export const GET_CURRENT_TRANSFERS = gql`
  query getCurrentTransfers($budgetID: ID!) {
    budget(budgetID: $budgetID) {
      currentMonth {
        transfers {
          ...Transfer
        }
      }
    }
  }
  ${TRANSFER_FRAGMENT}
`;

export const GET_TRANSFERS = gql`
  query getTransfers($budgetID: ID!, $month: Month!) {
    monthlyReport(budgetID: $budgetID, month: $month) {
      transfers {
        ...Transfer
      }
    }
  }
  ${TRANSFER_FRAGMENT}
`;

export function useGetCurrentTransfers() {
  const { selectedBudget } = useBudget();
  return useQuery(GET_CURRENT_TRANSFERS, {
    variables: { budgetID: selectedBudget.id },
  });
}

export function useGetTransfers(month) {
  const { selectedBudget } = useBudget();
  return useQuery(GET_TRANSFERS, {
    variables: { budgetID: selectedBudget.id, month },
  });
}

const CREATE_TRANSFER = gql`
  mutation createTransfer($budgetID: ID!, $input: TransferInput!) {
    createTransfer(budgetID: $budgetID, in: $input) {
      ...Transfer
    }
  }
  ${TRANSFER_FRAGMENT}
`;

export function useCreateTransfer() {
  const { selectedBudget } = useBudget();
  const [mutation, ...rest] = useMutation(CREATE_TRANSFER, {
    update: (cache, { data: { createTransfer } }) => {
      const { monthlyReport } = cache.readQuery({
        query: GET_TRANSFERS,
        variables: {
          budgetID: selectedBudget.id,
          month: selectedBudget.currentMonth.month,
        },
      });
      cache.writeQuery({
        query: GET_TRANSFERS,
        variables: {
          budgetID: selectedBudget.id,
          month: selectedBudget.currentMonth.month,
        },
        data: {
          monthlyReport: {
            ...monthlyReport,
            transfers: monthlyReport.transfers.concat([createTransfer]),
          },
        },
      });
    },
    refetchQueries: () => [
      { query: GET_ACCOUNTS, variables: { budgetID: selectedBudget.id } },
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

const UPDATE_TRANSFER = gql`
  mutation updateTransfer($budgetID: ID!, $id: ID!, $input: TransferUpdate!) {
    updateTransfer(budgetID: $budgetID, id: $id, in: $input) {
      ...Transfer
    }
  }
  ${TRANSFER_FRAGMENT}
`;

export function useUpdateTransfer() {
  const { selectedBudget } = useBudget();
  const [mutation, ...rest] = useMutation(UPDATE_TRANSFER, {
    refetchQueries: () => [
      { query: GET_ACCOUNTS, variables: { budgetID: selectedBudget.id } },
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

const DELETE_TRANSFER = gql`
  mutation deleteTransfer($budgetID: ID!, $id: ID!) {
    deleteTransfer(budgetID: $budgetID, id: $id) {
      id
    }
  }
`;

export function useDeleteTranfer() {
  const { selectedBudget } = useBudget();
  const [mutation, ...rest] = useMutation(DELETE_TRANSFER, {
    update: (cache, { data: { deleteTransfer } }) => {
      const { monthlyReport } = cache.readQuery({
        query: GET_TRANSFERS,
        variables: {
          budgetID: selectedBudget.id,
          month: selectedBudget.currentMonth.month,
        },
      });
      cache.writeQuery({
        query: GET_TRANSFERS,
        variables: {
          budgetID: selectedBudget.id,
          month: selectedBudget.currentMonth.month,
        },
        data: {
          monthlyReport: {
            ...monthlyReport,
            transfers: removeFromListByID(
              monthlyReport.transfers,
              deleteTransfer.id
            ),
          },
        },
      });
    },
    refetchQueries: () => [
      { query: GET_ACCOUNTS, variables: { budgetID: selectedBudget.id } },
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
