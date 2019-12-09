import React from 'react';
import { Route, Switch } from 'react-router-dom';

import pl from '../../lang/pl';
import { useAuth0 } from '../../react-auth0-spa';
import AccountsPage from '../Accounts/AccountsPage';
import { MonthProvider } from '../context/Month';
import Envelopes from '../Envelopes/EnvelopesPage';
import ExpensesPage from '../Expenses/ExpensesPage';
import { BudgetContext, BudgetProvider } from '../gql/budget';
import { MonthDashboardPage } from '../MonthDashboardPage/MonthDashboardPage';
import PlansPage from '../Plans/PlansPage';
import { SBAdmin2 } from '../sbadmin2';
import Topbar from '../Topbar';
import { TransfersPage } from '../Transfers/TransfersPage';
import { sidebarConfig } from './sidebarConfig';

const dictionaries = {
  pl,
};

export default function App() {
  const { user, logout } = useAuth0();
  return (
    <BudgetProvider>
      <SBAdmin2
        sidebarProps={{
          renderBrandName: () => 'Budget',
          renderBrandIcon: () => <i className='fas fa-bold' />,
          config: sidebarConfig(pl),
        }}
        topbar={Topbar}
        copyright={'Budget 2019'}
        dictionaries={dictionaries}
        user={user}
        logout={logout}
      >
        <BudgetContext.Consumer>
          {({ selectedBudget }) =>
            selectedBudget && (
              <MonthProvider currentMonth={selectedBudget.currentMonth.month}>
                <Switch>
                  <Route path='/accounts' component={AccountsPage} />
                  <Route path='/envelopes' component={Envelopes} />
                  <Route path='/expenses' component={ExpensesPage} />
                  <Route path='/transfers' component={TransfersPage} />
                  <Route path='/plans' component={PlansPage} />
                  <Route path='/' component={MonthDashboardPage} />
                </Switch>
              </MonthProvider>
            )
          }
        </BudgetContext.Consumer>
      </SBAdmin2>
    </BudgetProvider>
  );
}
