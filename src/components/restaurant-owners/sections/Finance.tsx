'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Banknote,
  PieChart,
  BarChart3,
  Download,
  Filter,
  Calendar,
  Users,
  ShoppingBag,
  Coffee,
  Utensils,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface FinancialTransaction {
  id: number;
  date: string;
  description: string;
  category: 'sales' | 'food' | 'beverage' | 'labor' | 'rent' | 'utilities' | 'marketing' | 'other';
  type: 'revenue' | 'expense';
  amount: number;
  branch: string;
  status: 'completed' | 'pending' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'online' | 'other';
}

interface FinancialMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  color: string;
  bgColor: string;
}

interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
  icon: any;
}

export function Finance() {
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([
    { id: 1, date: '2023-12-01', description: 'Daily Sales - Downtown', category: 'sales', type: 'revenue', amount: 4250.75, branch: 'Downtown Main', status: 'completed', paymentMethod: 'card' },
    { id: 2, date: '2023-12-01', description: 'Food Supplies Purchase', category: 'food', type: 'expense', amount: 1250.50, branch: 'Downtown Main', status: 'completed', paymentMethod: 'online' },
    { id: 3, date: '2023-12-01', description: 'Staff Wages - November', category: 'labor', type: 'expense', amount: 8500.00, branch: 'All', status: 'pending', paymentMethod: 'other' },
    { id: 4, date: '2023-11-30', description: 'Beverage Inventory', category: 'beverage', type: 'expense', amount: 850.25, branch: 'Uptown Plaza', status: 'completed', paymentMethod: 'card' },
    { id: 5, date: '2023-11-30', description: 'Rent Payment - Downtown', category: 'rent', type: 'expense', amount: 3500.00, branch: 'Downtown Main', status: 'completed', paymentMethod: 'online' },
    { id: 6, date: '2023-11-29', description: 'Online Orders Revenue', category: 'sales', type: 'revenue', amount: 1850.00, branch: 'All', status: 'completed', paymentMethod: 'online' },
    { id: 7, date: '2023-11-29', description: 'Marketing Campaign', category: 'marketing', type: 'expense', amount: 1200.00, branch: 'All', status: 'completed', paymentMethod: 'card' },
    { id: 8, date: '2023-11-28', description: 'Utilities - November', category: 'utilities', type: 'expense', amount: 850.75, branch: 'All', status: 'completed', paymentMethod: 'other' },
  ]);

  const [filterDate, setFilterDate] = useState<string>('month'); // day, week, month, year, custom
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '2023-12-01', end: '2023-12-31' });
  const [showTransactionDetail, setShowTransactionDetail] = useState<FinancialTransaction | null>(null);
  
  const chartRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate metrics cards
    gsap.from('.metric-card', {
      duration: 0.6,
      y: 30,
      opacity: 1,
      stagger: 0.1,
      ease: 'power3.out'
    });

    // Animate chart section
    if (chartRef.current) {
      gsap.from(chartRef.current, {
        duration: 0.8,
        y: 40,
        opacity: 0,
        delay: 0.3,
        ease: 'power3.out'
      });
    }
  }, []);

  // Calculate financial metrics
  const totalRevenue = transactions
    .filter(t => t.type === 'revenue')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue * 100) : 0;

  const metrics: FinancialMetric[] = [
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Total Expenses',
      value: `$${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      change: '+8.2%',
      trend: 'up',
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      label: 'Net Profit',
      value: `$${netProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      change: '+15.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Profit Margin',
      value: `${profitMargin.toFixed(1)}%`,
      change: '+2.1%',
      trend: 'up',
      icon: PieChart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
  ];

  // Category breakdown
  const categoryBreakdown: CategoryBreakdown[] = [
    { category: 'Sales', amount: totalRevenue, percentage: 100, color: 'bg-green-500', icon: ShoppingBag },
    { category: 'Food', amount: transactions.filter(t => t.category === 'food').reduce((sum, t) => sum + t.amount, 0), percentage: 18.5, color: 'bg-red-500', icon: Utensils },
    { category: 'Labor', amount: transactions.filter(t => t.category === 'labor').reduce((sum, t) => sum + t.amount, 0), percentage: 32.5, color: 'bg-blue-500', icon: Users },
    { category: 'Beverage', amount: transactions.filter(t => t.category === 'beverage').reduce((sum, t) => sum + t.amount, 0), percentage: 9.8, color: 'bg-yellow-500', icon: Coffee },
    { category: 'Rent', amount: transactions.filter(t => t.category === 'rent').reduce((sum, t) => sum + t.amount, 0), percentage: 15.2, color: 'bg-purple-500', icon: Banknote },
    { category: 'Other', amount: transactions.filter(t => t.category === 'other').reduce((sum, t) => sum + t.amount, 0), percentage: 24, color: 'bg-gray-500', icon: MoreVertical },
  ];

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
    const matchesBranch = selectedBranch === 'all' || transaction.branch === selectedBranch;
    return matchesCategory && matchesBranch;
  });

  // Payment method icons
  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'cash': return '💵';
      case 'card': return '💳';
      case 'online': return '🌐';
      default: return '📄';
    }
  };

  // Status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Generate financial report
  const generateReport = () => {
    alert('Financial report generated and downloaded!');
    // In production, this would generate a PDF/Excel file
  };

  // Export transactions
  const exportTransactions = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Date,Description,Category,Type,Amount,Branch,Status,Payment Method"]
      .concat(filteredTransactions.map(t => 
        `${t.date},${t.description},${t.category},${t.type},${t.amount},${t.branch},${t.status},${t.paymentMethod}`
      ))
      .join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `financial_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Chart data simulation
  const chartData = [
    { month: 'Jul', revenue: 85000, expenses: 65000 },
    { month: 'Aug', revenue: 92000, expenses: 72000 },
    { month: 'Sep', revenue: 88000, expenses: 68000 },
    { month: 'Oct', revenue: 105000, expenses: 82000 },
    { month: 'Nov', revenue: 115000, expenses: 85000 },
    { month: 'Dec', revenue: 125000, expenses: 92000 },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Financial Dashboard</h1>
          <p className="text-gray-600">Track revenue, expenses, and financial performance</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportTransactions}
            className="px-4 py-2 border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={generateReport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Date Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            {filterDate === 'custom' && (
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="sales">Sales</option>
                <option value="food">Food</option>
                <option value="beverage">Beverage</option>
                <option value="labor">Labor</option>
                <option value="rent">Rent</option>
                <option value="utilities">Utilities</option>
                <option value="marketing">Marketing</option>
                <option value="other">Other</option>
              </select>
            </div>

            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Branches</option>
              <option value="Downtown Main">Downtown Main</option>
              <option value="Uptown Plaza">Uptown Plaza</option>
              <option value="Riverside Branch">Riverside Branch</option>
              <option value="Westside Outlet">Westside Outlet</option>
            </select>
          </div>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="metric-card bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {metric.change}
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium">{metric.label}</p>
              <p className={`text-2xl font-bold ${metric.color} mt-2`}>{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts and Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue vs Expenses Chart */}
        <div ref={chartRef} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Revenue vs Expenses</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Expenses</span>
              </div>
            </div>
          </div>

          {/* Simplified Chart Visualization */}
          <div className="h-64">
            <div className="flex items-end justify-between h-48 mt-8">
              {chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-16">
                  <div className="text-xs text-gray-500 mb-2">{item.month}</div>
                  <div className="flex items-end space-x-1 w-full">
                    <div 
                      className="w-6 bg-green-500 rounded-t"
                      style={{ height: `${(item.revenue / 130000) * 100}%` }}
                    ></div>
                    <div 
                      className="w-6 bg-red-500 rounded-t"
                      style={{ height: `${(item.expenses / 130000) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    ${(item.revenue / 1000).toFixed(0)}k
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-500">Avg. Daily Revenue</p>
                <p className="text-xl font-bold text-green-600">
                  ${(totalRevenue / 30).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-gray-500">Avg. Daily Expenses</p>
                <p className="text-xl font-bold text-red-600">
                  ${(totalExpenses / 30).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Expense Breakdown</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {categoryBreakdown.slice(1).map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`h-8 w-8 ${item.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{item.category}</p>
                        <p className="text-sm text-gray-500">
                          ${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-800">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Expenses</p>
                <p className="text-xl font-bold text-gray-800">
                  ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Cost of Goods Sold</p>
                <p className="text-xl font-bold text-red-600">
                  ${(totalExpenses * 0.65).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
            <div className="text-sm text-gray-500">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Description</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Category</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Branch</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Amount</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Payment</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-800">
                        {new Date(transaction.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString('en-US', { 
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-gray-800">{transaction.description}</p>
                    <p className="text-sm text-gray-500 capitalize">{transaction.type}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                      transaction.type === 'revenue' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-800">{transaction.branch}</span>
                  </td>
                  <td className="py-4 px-6">
                    <p className={`font-bold ${
                      transaction.type === 'revenue' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'revenue' ? '+' : '-'}$
                      {transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{getPaymentMethodIcon(transaction.paymentMethod)}</span>
                      <span className="text-sm text-gray-600 capitalize">{transaction.paymentMethod}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setShowTransactionDetail(transaction)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-xl font-bold text-green-600">
                  ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Expenses</p>
                <p className="text-xl font-bold text-red-600">
                  ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Net Profit</p>
                <p className="text-xl font-bold text-blue-600">
                  ${netProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            <button
              onClick={() => {/* Add transaction functionality */}}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Transaction
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {showTransactionDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Transaction Details</h3>
                <button
                  onClick={() => setShowTransactionDetail(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowDownRight className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Transaction ID</p>
                    <p className="font-medium">#{showTransactionDetail.id.toString().padStart(6, '0')}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">
                      {new Date(showTransactionDetail.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">Description</p>
                  <p className="text-lg font-medium">{showTransactionDetail.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Category</p>
                    <div className="flex items-center mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                        showTransactionDetail.type === 'revenue' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {showTransactionDetail.category}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Branch</p>
                    <p className="font-medium mt-2">{showTransactionDetail.branch}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className="text-xl">{getPaymentMethodIcon(showTransactionDetail.paymentMethod)}</span>
                      <span className="font-medium capitalize">{showTransactionDetail.paymentMethod}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium border ${
                      getStatusColor(showTransactionDetail.status)
                    }`}>
                      {showTransactionDetail.status}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Transaction Amount</p>
                    <p className={`text-4xl font-bold ${
                      showTransactionDetail.type === 'revenue' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {showTransactionDetail.type === 'revenue' ? '+' : '-'}$
                      {showTransactionDetail.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    onClick={() => setShowTransactionDetail(null)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Edit Transaction
                  </button>
                  <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Financial Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
          <h4 className="text-lg font-semibold mb-4">Financial Insights</h4>
          <ul className="space-y-3">
            <li className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">Revenue increased by 12.5% this month</span>
            </li>
            <li className="flex items-center">
              <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm">Labor costs optimized by 8%</span>
            </li>
            <li className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-sm">Food costs 3% above target</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
          <h4 className="text-lg font-semibold mb-4">Top Performing Branch</h4>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold">Downtown Main</p>
              <p className="text-sm text-gray-600">Highest revenue generator</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-gray-500">Daily Avg.</p>
              <p className="font-bold text-gray-800">$4,250</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-gray-500">Growth</p>
              <p className="font-bold text-green-600">+15.3%</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
          <h4 className="text-lg font-semibold mb-4">Upcoming Payments</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div>
                <p className="font-medium">Rent - Uptown</p>
                <p className="text-sm text-gray-500">Due in 3 days</p>
              </div>
              <p className="font-bold text-red-600">$3,500</p>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div>
                <p className="font-medium">Supplier Payment</p>
                <p className="text-sm text-gray-500">Due in 7 days</p>
              </div>
              <p className="font-bold text-red-600">$2,150</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}