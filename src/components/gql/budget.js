import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { GET_EXPENSES } from './expenses';
import { GET_MONTHLY_REPORT } from './monthlyReport';
import { GET_CURRENT_PLANS } from './plans';
import { GET_CURRENT_TRANSFERS } from './transfers';

export const BudgetContext = createContext();
export const useBudget = () => useContext(BudgetContext);

const GET_BUDGETS = gql`
  query GetBudgets {
    budgets {
      id
      name
      currentMonth {
        month
      }
    }
  }
`;

const storageKey = 'LAST-CHOSEN-BUDGET-ID';

export function BudgetProvider({ children }) {
  const [selectedBudget, setSelectedBudget] = useState(null);
  const { loading, error, data } = useQuery(GET_BUDGETS);

  useEffect(() => {
    if (selectedBudget) {
      sessionStorage.setItem(storageKey, selectedBudget.id);
    }
  }, [selectedBudget]);

  useEffect(() => {
    if (!selectedBudget && data && data.budgets) {
      const lastChosenID = sessionStorage.getItem(storageKey);
      const lastChosen = data.budgets.find(b => b.id === lastChosenID);
      if (lastChosen) {
        setSelectedBudget(lastChosen);
      }
    }
  }, [data, selectedBudget]);

  const value = {
    selectedBudget,
    setSelectedBudget,
    loading,
    error,
    budgets: !loading && !error ? data.budgets : [],
  };

  if (error) {
    console.error(error);
  }
  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
}

BudgetProvider.propTypes = {
  children: PropTypes.node,
};

const CLOSE_CURRENT_MONTH = gql`
  mutation closeMonth($budgetID: ID!) {
    closeCurrentMonth(budgetID: $budgetID) {
      id
    }
  }
`;

export function useCloseCurrentMonth() {
  const { selectedBudget } = useBudget();
  const [mutation, ...rest] = useMutation(CLOSE_CURRENT_MONTH, {
    refetchQueries: () => [
      {
        query: GET_MONTHLY_REPORT,
        variables: {
          budgetID: selectedBudget.id,
          month: selectedBudget.currentMonth,
        },
      },
      {
        query: GET_CURRENT_PLANS,
        variables: { budgetID: selectedBudget.id },
      },
      {
        query: GET_CURRENT_TRANSFERS,
        variables: { budgetID: selectedBudget.id },
      },
      {
        query: GET_EXPENSES,
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
