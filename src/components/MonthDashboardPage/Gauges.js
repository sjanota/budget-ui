import PropTypes from 'prop-types';
import React from 'react';
import { Row } from 'react-bootstrap';

import Amount from '../../model/Amount';
import { useDictionary } from '../sbadmin2';
import { Gauge } from '../sbadmin2/Gauge';

export function Gauges({ className, month }) {
  const { dashboard } = useDictionary();
  return (
    <div className={className}>
      <Row>
        <Gauge
          className='col-6 col-lg-12 mb-4'
          variant='primary'
          title={dashboard.planned}
          value={Amount.prettyFormat(month.totalPlannedAmount)}
          faIcon='clipboard-list'
        />
        <Gauge
          className='col-6 col-lg-12 mb-4'
          variant='primary'
          title={dashboard.incomes}
          value={Amount.prettyFormat(month.totalIncomeAmount)}
          faIcon='briefcase'
        />
        <Gauge
          className='col-6 col-lg-12 mb-4'
          variant='primary'
          title={dashboard.leftToPlan}
          value={Amount.prettyFormat(
            month.totalIncomeAmount - month.totalPlannedAmount
          )}
          faIcon='balance-scale'
        />
        <Gauge
          className='col-6 col-lg-12 mb-4'
          variant='primary'
          title={dashboard.expenses}
          value={Amount.prettyFormat(month.totalExpenseAmount)}
          faIcon='receipt'
        />
      </Row>
    </div>
  );
}

Gauges.propTypes = {
  className: PropTypes.string,
  month: PropTypes.shape({
    totalPlannedAmount: PropTypes.number,
    totalIncomeAmount: PropTypes.number,
    totalExpenseAmount: PropTypes.number,
  }),
};
