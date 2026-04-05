import { useState, useMemo } from 'react';
import { mockTransactions, categories, balanceTrendData, spendingByCategory } from '../data/mockData';

export const useFinanceData = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [filters, setFilters] = useState({
    category: 'All',
    type: 'All',
    searchTerm: ''
  });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions;

    if (filters.category !== 'All') {
      filtered = filtered.filter(t => t.category === filters.category);
    }

    if (filters.type !== 'All') {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    if (filters.searchTerm) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sorted;
  }, [transactions, filters, sortBy, sortOrder]);

  const financialSummary = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expenses;

    return {
      totalIncome: income,
      totalExpenses: expenses,
      balance,
      transactionCount: transactions.length
    };
  }, [transactions]);

  const insights = useMemo(() => {
    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    const highestSpendingCategory = Object.entries(expensesByCategory)
      .sort(([,a], [,b]) => b - a)[0];

    const monthlyExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        const month = new Date(t.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        acc[month] = (acc[month] || 0) + t.amount;
        return acc;
      }, {});

    const averageTransaction = transactions.length > 0 
      ? transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length 
      : 0;

    return {
      highestSpendingCategory: highestSpendingCategory ? {
        category: highestSpendingCategory[0],
        amount: highestSpendingCategory[1]
      } : null,
      monthlyExpenses,
      averageTransaction: Math.round(averageTransaction),
      totalTransactions: transactions.length,
      recentTransactions: transactions.slice(-5).reverse()
    };
  }, [transactions]);

  const addTransaction = (transaction) => {
    const date = transaction.date || new Date().toISOString().split('T')[0];

    setTransactions(prev => {
      const nextId = prev.length > 0 ? Math.max(...prev.map(t => t.id)) + 1 : 1;
      const newTransaction = {
        ...transaction,
        id: nextId,
        date
      };
      return [...prev, newTransaction];
    });
  };

  const updateTransaction = (id, updates) => {
    setTransactions(prev => 
      prev.map(t => t.id === id ? { ...t, ...updates } : t)
    );
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const updateSorting = (field) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return {
    transactions: filteredAndSortedTransactions,
    allTransactions: transactions,
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
  };
};
