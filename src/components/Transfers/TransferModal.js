import PropTypes from 'prop-types';
import React from 'react';

import Amount from '../../model/Amount';
import Month from '../../model/Month';
import { AmountInput } from '../Expenses/AmountInput';
import { useGetAccounts } from '../gql/accounts';
import { useBudget } from '../gql/budget';
import { WithQuery } from '../gql/WithQuery';
import { Combobox, useDictionary } from '../sbadmin2';
import { FormControl } from '../sbadmin2/utilities/FormControl';
import { FormInModal } from '../sbadmin2/utilities/FormInModal';
import { InlineFormControl } from '../sbadmin2/utilities/InlineFormControl';
import { useFormData } from '../sbadmin2/utilities/useFormData';

export function TransferModal({ toAccount, fromAccount, init, ...props }) {
  const { selectedBudget } = useBudget();
  const { transfers } = useDictionary();
  const query = useGetAccounts();
  const formData = useFormData({
    title: { $init: init.title },
    date: { $init: init.date },
    amount: {
      $init: Amount.format(init.amount, false),
      $process: Amount.parse,
    },
    fromAccountID: {
      $init: init.fromAccount && init.fromAccount.id,
      $process: v => (v === '' ? null : v),
      $default: fromAccount && fromAccount.id,
    },
    toAccountID: {
      $init: init.toAccount.id,
      $default: toAccount && toAccount.id,
    },
  });

  const month = Month.parse(selectedBudget.currentMonth.month);
  const first = month.firstDay();
  const last = month.lastDay();
  return (
    <FormInModal formData={formData} {...props}>
      <WithQuery query={query}>
        {({ data }) => (
          <>
            <FormControl
              required
              label={transfers.modal.labels.title}
              inline={10}
              formData={formData.title}
              feedback='Provide title'
            />
            <FormControl
              label={transfers.modal.labels.date}
              inline={10}
              formData={formData.date}
              feedback='Provide date'
              type='date'
              required
              min={first.format()}
              max={last.format()}
            />
            <FormControl inline={10} label={transfers.modal.labels.amount}>
              <AmountInput formData={formData.amount} />
            </FormControl>{' '}
            <InlineFormControl
              size={10}
              label={transfers.modal.labels.fromAccount}
            >
              <Combobox
                allowedValues={data.accounts.map(({ id, name }) => ({
                  id,
                  label: name,
                }))}
                _ref={formData.fromAccountID}
                defaultValue={formData.fromAccountID.default()}
                disabled={!!fromAccount}
              />
            </InlineFormControl>
            <InlineFormControl
              size={10}
              label={transfers.modal.labels.toAccount}
            >
              <Combobox
                allowedValues={data.accounts.map(({ id, name }) => ({
                  id,
                  label: name,
                }))}
                _ref={formData.toAccountID}
                defaultValue={formData.toAccountID.default()}
                disabled={!!toAccount}
              />
            </InlineFormControl>
          </>
        )}
      </WithQuery>
    </FormInModal>
  );
}

TransferModal.propTypes = {
  fromAccount: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  init: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    amount: PropTypes.number,
    fromAccount: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    toAccount: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
  toAccount: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};
