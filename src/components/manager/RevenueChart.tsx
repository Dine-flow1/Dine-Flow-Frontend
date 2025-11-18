// src/components/manager/RevenueChart.tsx
'use client';

import { RevenueData } from '../../types/manager';
import { useState } from 'react';

interface RevenueChartProps {
  data: RevenueData[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  const maxRevenue = Math.max(...data.map(d => d.revenue));
  
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Revenue Overview</h3>
        <div className="flex space-x-2">
          {(['week', 'month', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64">
        <div className="flex items-end justify-between h-48 space-x-2">
          {data.map((item, index) => {
            const height = (item.revenue / maxRevenue) * 100;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-300 hover:from-green-600 hover:to-green-500 cursor-pointer"
                    style={{ height: `${Math.max(height, 8)}%` }}
                  ></div>
                  <div className="w-full h-2 bg-green-200 rounded-b-lg"></div>
                </div>
                <div className="mt-2 text-xs text-gray-500 font-medium">
                  {item.date}
                </div>
                <div className="mt-1 text-sm font-semibold text-gray-900">
                  ${item.revenue}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">${data.reduce((sum, day) => sum + day.revenue, 0).toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{data.reduce((sum, day) => sum + day.orders, 0)}</div>
          <div className="text-sm text-gray-600">Total Orders</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            ${(data.reduce((sum, day) => sum + day.revenue, 0) / data.reduce((sum, day) => sum + day.orders, 1)).toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">Avg. Order Value</div>
        </div>
      </div>
    </div>
  );
};