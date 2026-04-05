import React from 'react';
import { Search, Filter } from 'lucide-react';

const TransactionFilters = ({ filters, categories, onFilterChange, onSortChange, sortBy, sortOrder }) => {
  return (
    <div className="card space-y-4">
      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
        <Filter className="w-5 h-5" />
        <h3 className="font-medium">Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="input pl-10"
              value={filters.searchTerm}
              onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            className="select"
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value })}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Type
          </label>
          <select
            className="select"
            value={filters.type}
            onChange={(e) => onFilterChange({ type: e.target.value })}
          >
            <option value="All">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sort By
          </label>
          <select
            className="select"
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field] = e.target.value.split('-');
              onSortChange(field);
            }}
          >
            <option value="date-desc">Date (Newest)</option>
            <option value="date-asc">Date (Oldest)</option>
            <option value="amount-desc">Amount (High to Low)</option>
            <option value="amount-asc">Amount (Low to High)</option>
            <option value="description-asc">Description (A-Z)</option>
            <option value="description-desc">Description (Z-A)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;
