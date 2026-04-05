import React from 'react';
import MetricCard from './MetricCard';
import BalanceChart from './BalanceChart';
import SpendingChart from './SpendingChart';

const DashboardOverview = ({ financialSummary, balanceTrendData, spendingByCategory }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Balance"
          value={financialSummary.balance}
          change={12.5}
          changeType="positive"
          icon="dollar"
          type="default"
        />
        <MetricCard
          title="Total Income"
          value={financialSummary.totalIncome}
          change={8.2}
          changeType="positive"
          icon="trending-up"
          type="income"
        />
        <MetricCard
          title="Total Expenses"
          value={financialSummary.totalExpenses}
          change={-3.1}
          changeType="negative"
          icon="trending-down"
          type="expense"
        />
        <MetricCard
          title="Transactions"
          value={financialSummary.transactionCount}
          change={15.3}
          changeType="positive"
          icon="activity"
          type="default"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceChart data={balanceTrendData} />
        <SpendingChart data={spendingByCategory} />
      </div>
    </div>
  );
};

export default DashboardOverview;
