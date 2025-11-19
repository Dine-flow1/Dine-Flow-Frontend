
'use client';
import { RevenueData } from '../../types/manager';
import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface RevenueChartProps {
  data: RevenueData[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Revenue ($)',
        data: data.map(item => item.revenue),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
      {
        label: 'Orders',
        data: data.map(item => item.orders),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Revenue & Orders Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

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
        <Bar data={chartData} options={options} />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            ${data.reduce((sum, day) => sum + day.revenue, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {data.reduce((sum, day) => sum + day.orders, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Orders</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            ${(data.reduce((sum, day) => sum + day.revenue, 0) / 
               data.reduce((sum, day) => sum + day.orders, 1)).toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">Avg. Order Value</div>
        </div>
      </div>
    </div>
  );
};