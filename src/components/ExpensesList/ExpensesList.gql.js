import gql from "graphql-tag";

const EXPENSE_FRAGMENT = gql`
    fragment ExpensesDetails on Expense {
        id
        title
        date
        total
        location
        account {
            id
            name
        }
    }
`;

export const EXPENSES_QUERY = gql`
    query QueryExpenses {
        expenses {
            ...ExpensesDetails
        }
    }
    ${EXPENSE_FRAGMENT}
`;

export const EXPENSES_EVENTS_SUBSCRIPTION = gql`
    subscription WatchExpenses {
        expenseEvents {
            type
            ... on ExpenseAdded {
                expense {
                    ...ExpensesDetails
                }
            }
        }
    }
    ${EXPENSE_FRAGMENT}
`;