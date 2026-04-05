import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Target, AlertCircle } from 'lucide-react';

const InsightsSection = ({ insights, financialSummary }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const insightCards = [
    {
      title: 'Highest Spending Category',
      value: insights.highestSpendingCategory 
        ? `${insights.highestSpendingCategory.category}: ${formatCurrency(insights.highestSpendingCategory.amount)}`
        : 'No data available',
      icon: Target,
      color: 'text-red-600 bg-red-50 dark:bg-red-900 dark:text-red-200',
      trend: null
    },
    {
      title: 'Average Transaction',
      value: formatCurrency(insights.averageTransaction),
      icon: DollarSign,
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-900 dark:text-blue-200',
      trend: null
    },
    {
      title: 'Total Transactions',
      value: insights.totalTransactions.toString(),
      icon: Calendar,
      color: 'text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-200',
      trend: null
    },
    {
      title: 'Savings Rate',
      value: financialSummary.totalIncome > 0 
        ? `${Math.round((financialSummary.balance / financialSummary.totalIncome) * 100)}%`
        : '0%',
      icon: TrendingUp,
      color: financialSummary.balance > 0 
        ? 'text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-200'
        : 'text-red-600 bg-red-50 dark:bg-red-900 dark:text-red-200',
      trend: financialSummary.balance > 0 ? 'positive' : 'negative'
    }
  ];

  const monthlyComparison = Object.entries(insights.monthlyExpenses)
    .slice(-3)
    .map(([month, amount], index, array) => {
      let trend = null;
      if (index > 0) {
        const prevAmount = array[index - 1][1];
        const change = ((amount - prevAmount) / prevAmount) * 100;
        trend = change > 0 ? 'negative' : 'positive';
      }
      
      return {
        month,
        amount,
        trend
      };
    });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insightCards.map((insight, index) => {
          const IconComponent = insight.icon;
          return (
            <div key={index} className={`card ${insight.color} border-0`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-80 mb-1">
                    {insight.title}
                  </p>
                  <p className="text-lg font-bold">
                    {insight.value}
                  </p>
                  {insight.trend && (
                    <div className="flex items-center mt-2">
                      {insight.trend === 'positive' ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      <span className="text-xs">
                        {insight.trend === 'positive' ? 'Good' : 'Needs attention'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="opacity-60">
                  <IconComponent className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Monthly Expense Comparison
        </h3>
        <div className="space-y-3">
          {monthlyComparison.length > 0 ? (
            monthlyComparison.map(({ month, amount, trend }) => (
              <div key={month} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {month}
                  </span>
                  {trend && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      trend === 'positive' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {trend === 'positive' ? 'Decreased' : 'Increased'}
                    </span>
                  )}
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(amount)}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No monthly data available
            </p>
          )}
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Financial Health Tips
        </h3>
        <div className="space-y-3">
          {financialSummary.balance < 0 && (
            <div className="flex items-start space-x-3 p-3 bg-red-50 dark:bg-red-900 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-200 mt-0.5" />
              <div>
                <p className="font-medium text-red-900 dark:text-red-100">
                  Negative Balance Alert
                </p>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  Your expenses exceed your income. Consider reviewing your spending habits.
                </p>
              </div>
            </div>
          )}
          
          {insights.highestSpendingCategory && (
            <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-200 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100">
                  Top Spending Category
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  You spend the most on {insights.highestSpendingCategory.category}. 
                  Look for opportunities to reduce costs in this area.
                </p>
              </div>
            </div>
          )}

          {financialSummary.totalIncome > 0 && financialSummary.balance / financialSummary.totalIncome > 0.2 && (
            <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-200 mt-0.5" />
              <div>
                <p className="font-medium text-green-900 dark:text-green-100">
                  Good Savings Rate
                </p>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  You're saving more than 20% of your income. Keep up the good work!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightsSection;
