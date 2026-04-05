import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Activity } from 'lucide-react';

const MetricCard = ({ title, value, change, changeType, icon, type = 'default' }) => {
  const getIcon = () => {
    switch (icon) {
      case 'dollar':
        return <DollarSign className="w-8 h-8 text-blue-600" />;
      case 'trending-up':
        return <TrendingUp className="w-8 h-8 text-green-600" />;
      case 'trending-down':
        return <TrendingDown className="w-8 h-8 text-red-600" />;
      case 'activity':
        return <Activity className="w-8 h-8 text-purple-600" />;
      default:
        return <DollarSign className="w-8 h-8 text-blue-600" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className={`metric-card ${type} fade-in`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {typeof value === 'number' ? formatCurrency(value) : value}
          </p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {changeType === 'positive' ? (
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {change > 0 ? '+' : ''}{change}%
              </span>
            </div>
          )}
        </div>
        <div className="opacity-80">
          {getIcon()}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
