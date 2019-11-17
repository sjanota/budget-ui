import gql from 'graphql-tag';
import { useBudget } from './budget';
import { useQuery } from '@apollo/react-hooks';

const MONTHLY_REPORT_FRAGMENT = gql`
  fragment MonthlyReport on MonthlyReport {
    month
    totalPlannedAmount
    totalIncomeAmount
    totalExpenseAmount
    problems {
      severity
      ... on EnvelopeOverLimit {
        id
      }
      ... on NegativeBalanceOnAccount {
        id
      }
      ... on NegativeBalanceOnEnvelope {
        id
      }
      ... on Misplanned {
        overplanned
      }
    }
  }
`;

export const GET_CURRENT_MONTHLY_REPORT = gql`
  query GetCurrentMonthlyReport($budgetID: ID!) {
    budget(budgetID: $budgetID) {
      currentMonth {
        ...MonthlyReport
      }
    }
  }
  ${MONTHLY_REPORT_FRAGMENT}
`;

export function useGetCurrentMonthlyReport() {
  const { selectedBudget } = useBudget();
  return useQuery(GET_CURRENT_MONTHLY_REPORT, {
    variables: { budgetID: selectedBudget.id },
    fetchPolicy: 'network-only',
  });
}
