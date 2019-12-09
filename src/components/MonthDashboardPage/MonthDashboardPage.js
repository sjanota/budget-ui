import React from 'react';
import { Row } from 'react-bootstrap';

import { useMonth } from '../context/Month';
import { useGetMonthlyReport } from '../gql/monthlyReport';
import { WithQuery } from '../gql/WithQuery';
import { Page } from '../sbadmin2';
import { CurrentMonth } from './CurrentMonth';
import { Gauges } from './Gauges';
import { MonthProblems } from './MonthProblems';

export function MonthDashboardPage() {
  const { currentMonth } = useMonth();
  const query = useGetMonthlyReport(currentMonth);
  return (
    <Page>
      <WithQuery query={query}>
        {({ data }) => (
          <Row>
            <CurrentMonth
              className='col-12 d-lg-none px-0'
              month={data.monthlyReport}
            />
            <Gauges className='col-12 col-lg-3' month={data.monthlyReport} />
            <MonthProblems
              className='col-12 d-lg-none px-0'
              problems={data.monthlyReport.problems}
            />
            <Row className='col-12 col-lg-9 flex-lg-column'>
              <CurrentMonth
                className='d-none d-lg-block'
                month={data.monthlyReport}
              />
              <MonthProblems
                className='d-none d-lg-block flex-grow-1'
                problems={data.monthlyReport.problems}
              />
            </Row>
          </Row>
        )}
      </WithQuery>
    </Page>
  );
}
