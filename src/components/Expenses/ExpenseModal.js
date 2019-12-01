import React from 'react';
import { FormControl } from '../sbadmin2/utilities/FormControl';
import { FormInModal } from '../sbadmin2/utilities/FormInModal';
import { useFormData } from '../sbadmin2/utilities/useFormData';
import Amount from '../../model/Amount';
import { useGetAccounts } from '../gql/accounts';
import { WithQuery } from '../gql/WithQuery';
import { useBudget } from '../gql/budget';
import Month from '../../model/Month';
import { useDictionary } from '../sbadmin2';
import { Combobox } from '../sbadmin2/utilities/Combobox';
import { InlineFormControl } from '../sbadmin2/utilities/InlineFormControl';
import { CategoriesInput } from './CategoriesInput';

export function ExpenseModal({ account, init, ...props }) {
  const { selectedBudget } = useBudget();
  const { expenses } = useDictionary();
  const accountsQuery = useGetAccounts();
  const formData = useFormData({
    title: { $init: init.title },
    date: { $init: init.date },
    accountID: {
      $init: init.account.id,
      $default: account && account.id,
    },
    categories: {
      $init: init.categories,
      $model: c => ({
        categoryID: { $init: c.category.id },
        amount: {
          $init: Amount.format(c.amount, false),
          $process: Amount.parse,
        },
        $includeAllValues: true,
      }),
    },
  });
  const month = Month.parse(selectedBudget.currentMonth.month);
  const first = month.firstDay();
  const last = month.lastDay();

  return (
    <FormInModal formData={formData} {...props}>
      <WithQuery query={accountsQuery}>
        {({ data: accountsData }) => (
          <>
            <FormControl
              label={expenses.modal.labels.title}
              inline={10}
              formData={formData.title}
              feedback="Provide name"
              required
            />
            <FormControl
              label={expenses.modal.labels.date}
              inline={10}
              formData={formData.date}
              feedback="Provide date"
              type="date"
              required
              min={first.format()}
              max={last.format()}
            />
            <InlineFormControl label={expenses.modal.labels.account} size={9}>
              <Combobox
                _ref={formData.accountID}
                defaultValue={formData.accountID.default()}
                allowedValues={accountsData.accounts.map(({ id, name }) => ({
                  id,
                  label: name,
                }))}
                disabled={!!account}
                required
              />
            </InlineFormControl>
            <CategoriesInput formData={formData.categories} />
          </>
        )}
      </WithQuery>
    </FormInModal>
  );
}
