import PropTypes from 'prop-types';
import React from 'react';

import Month from '../../model/Month';
import { Panel, useDictionary } from '../sbadmin2';
import { StartNextMonthButton } from './StartNextMonthButton';

export function CurrentMonth({ className, month }) {
  const { dashboard, months } = useDictionary();
  const parsed = Month.parse(month.month);
  return (
    <Panel className={className}>
      <Panel.Header>
        <div className='d-flex justify-content-between align-items-center'>
          <Panel.Title
            title={
              <span>
                {dashboard.currentMonth}:{' '}
                <strong>
                  <em>
                    {months[parsed.month - 1]} {parsed.year}
                  </em>
                </strong>
              </span>
            }
          />
          <div>
            <StartNextMonthButton
              disabled={month.problems.some(p => p.severity === 'ERROR')}
              warn={month.problems.length > 0}
            />
          </div>
        </div>
      </Panel.Header>
    </Panel>
  );
}

CurrentMonth.propTypes = {
  className: PropTypes.string,
  month: PropTypes.shape({
    month: PropTypes.string.isRequired,
    problems: PropTypes.arrayOf(
      PropTypes.shape({ severity: PropTypes.string.isRequired })
    ).isRequired,
  }),
};
