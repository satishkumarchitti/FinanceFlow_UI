import React from 'react';
import { Moon, Sun, User, Shield } from 'lucide-react';

const Header = ({ isDark, toggleTheme, role, onRoleChange, hasPermission }) => {
  const roles = [
    { value: 'viewer', label: 'Viewer', icon: User },
    { value: 'editor', label: 'Editor', icon: User },
    { value: 'admin', label: 'Admin', icon: Shield }
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'text-red-600 bg-red-50 dark:bg-red-900 dark:text-red-200';
      case 'editor':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">$</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Finance Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Role:
              </label>
              <select
                value={role}
                onChange={(e) => onRoleChange(e.target.value)}
                className={`select text-sm px-3 py-1.5 ${getRoleColor(role)}`}
              >
                {roles.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
