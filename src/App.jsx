import React, { useState } from 'react';
import Header from './components/Header/Header';
import DashboardOverview from './components/Dashboard/DashboardOverview';
import TransactionFilters from './components/Transactions/TransactionFilters';
import TransactionList from './components/Transactions/TransactionList';
import InsightsSection from './components/Insights/InsightsSection';
import { useFinanceData } from './hooks/useFinanceData';
import { useRoleBasedAccess } from './hooks/useRoleBasedAccess';
import { useTheme } from './hooks/useTheme';
import { Download, BarChart3, List, Lightbulb } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { 
    transactions, 
    financialSummary, 
    insights, 
    balanceTrendData, 
    spendingByCategory, 
    categories, 
    filters, 
    sortBy, 
    sortOrder,
    addTransaction, 
    updateTransaction, 
    deleteTransaction, 
    updateFilters, 
    updateSorting 
  } = useFinanceData();
  
  const { role, changeRole, hasPermission } = useRoleBasedAccess();
  const { isDark, toggleTheme } = useTheme();

  const handleExport = () => {
    if (!hasPermission('canExport')) {
      alert('You do not have permission to export data');
      return;
    }

    if (transactions.length === 0) {
      alert('No transactions to export');
      return;
    }

    const escapeCsvValue = (value) => {
      if (value === null || value === undefined) return '';
      const str = String(value);
      const shouldQuote = /[",\n\r]/.test(str);
      const escaped = str.replace(/"/g, '""');
      return shouldQuote ? `"${escaped}"` : escaped;
    };

    const dataToExport = transactions.map(t => ({
      Date: t.date,
      Description: t.description,
      Category: t.category,
      Type: t.type,
      Amount: t.amount
    }));

    const headers = Object.keys(dataToExport[0]);
    const csv = [
      headers.join(','),
      ...dataToExport.map(row => headers.map(h => escapeCsvValue(row[h])).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'transactions', label: 'Transactions', icon: List },
    { id: 'insights', label: 'Insights', icon: Lightbulb }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <Header 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        role={role}
        onRoleChange={changeRole}
        hasPermission={hasPermission}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <nav className="lg:w-64">
            <div className="card space-y-2">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === id
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
              
              {hasPermission('canExport') && (
                <button
                  onClick={handleExport}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Export CSV</span>
                </button>
              )}
            </div>
          </nav>

          <main className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="fade-in">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Financial Overview
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Track your financial activity and spending patterns
                  </p>
                </div>
                <DashboardOverview 
                  financialSummary={financialSummary}
                  balanceTrendData={balanceTrendData}
                  spendingByCategory={spendingByCategory}
                />
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="fade-in">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Transactions
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    View and manage your transaction history
                  </p>
                </div>
                
                <TransactionFilters
                  filters={filters}
                  categories={categories}
                  onFilterChange={updateFilters}
                  onSortChange={updateSorting}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
                
                <div className="mt-6">
                  <TransactionList
                    transactions={transactions}
                    categories={categories}
                    onEdit={updateTransaction}
                    onDelete={deleteTransaction}
                    onAdd={addTransaction}
                    canEdit={hasPermission('canEdit')}
                    canAdd={hasPermission('canAdd')}
                    canDelete={hasPermission('canDelete')}
                  />
                </div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="fade-in">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Financial Insights
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Understand your spending patterns and financial health
                  </p>
                </div>
                <InsightsSection 
                  insights={insights}
                  financialSummary={financialSummary}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
