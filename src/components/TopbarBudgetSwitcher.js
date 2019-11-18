import React from 'react';
import TopbarContextSwitcher from './sbadmin2/Topbar/TopbarContextSwitcher';
import { useBudget } from './gql/budget';
import Spinner from './sbadmin2/utilities/Spinner';
import { useDictionary } from './sbadmin2';

export default function TopbarBudgetSwitcher() {
  const {
    selectedBudget,
    setSelectedBudget,
    budgets,
    loading,
    error,
  } = useBudget();
  const { topbar } = useDictionary();
  const value = loading ? (
    <Spinner size="sm" variant="secondary" />
  ) : error ? (
    <i className="fas fa-fw fa-exclamation-triangle text-secondary" />
  ) : (
    selectedBudget && selectedBudget.name
  );
  const onChange = id => {
    const budget = budgets.find(b => b.id === id);
    setSelectedBudget(budget);
  };
  return (
    <TopbarContextSwitcher
      label={topbar.budgetLabel}
      value={value}
      onChange={onChange}
      allowedValues={budgets.map(b => ({ id: b.id, label: b.name }))}
    />
  );
}
