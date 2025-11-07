"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ChartData {
  labels: string[];
  values: number[];
}

interface MetricChartProps {
  title?: string;
  data?: ChartData;
  type?: 'line' | 'bar' | 'area';
  height?: number;
}

const MetricChart = ({ 
  title = "Revenue Overview", 
  data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    values: [65, 78, 90, 81, 86, 95, 100, 105]
  },
  type = 'line',
  height = 300
}: MetricChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(chartRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3 }
      );
    }
  }, []);

  // Calculate chart dimensions and scales
  const padding = { top: 40, right: 30, bottom: 40, left: 50 };
  const chartWidth = 600;
  const chartHeight = height;
  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;

  const maxValue = Math.max(...data.values);
  const minValue = Math.min(...data.values);

  // Scale functions
  const xScale = (index: number) => 
    padding.left + (index / (data.labels.length - 1)) * graphWidth;
  
  const yScale = (value: number) => 
    padding.top + graphHeight - ((value - minValue) / (maxValue - minValue || 1)) * graphHeight;

  // Generate path data for line chart
  const generateLinePath = () => {
    return data.values.map((value, index) => 
      `${index === 0 ? 'M' : 'L'} ${xScale(index)} ${yScale(value)}`
    ).join(' ');
  };

  // Generate area path
  const generateAreaPath = () => {
    const linePath = generateLinePath();
    return `${linePath} L ${xScale(data.values.length - 1)} ${yScale(minValue)} L ${xScale(0)} ${yScale(minValue)} Z`;
  };

  return (
    <div ref={chartRef} className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">Last 8 months performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <select className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 8 months</option>
            <option>Last 12 months</option>
            <option>Year to date</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        <svg
          ref={svgRef}
          width="100%"
          height={chartHeight}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="overflow-visible"
        >
          {/* Grid lines */}
          <g className="text-gray-300">
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1={padding.left}
                y1={padding.top + (i * graphHeight) / 4}
                x2={chartWidth - padding.right}
                y2={padding.top + (i * graphHeight) / 4}
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}
          </g>

          {/* Y-axis labels */}
          <g className="text-xs text-gray-600">
            {[0, 1, 2, 3, 4].map((i) => {
              const value = minValue + (i * (maxValue - minValue)) / 4;
              return (
                <text
                  key={i}
                  x={padding.left - 10}
                  y={padding.top + (i * graphHeight) / 4}
                  textAnchor="end"
                  dominantBaseline="middle"
                >
                  ${Math.round(value)}K
                </text>
              );
            })}
          </g>

          {/* X-axis labels */}
          <g className="text-xs text-gray-600">
            {data.labels.map((label, index) => (
              <text
                key={index}
                x={xScale(index)}
                y={chartHeight - padding.bottom + 20}
                textAnchor="middle"
              >
                {label}
              </text>
            ))}
          </g>

          {/* Chart area */}
          {type === 'area' && (
            <path
              d={generateAreaPath()}
              fill="url(#areaGradient)"
              fillOpacity="0.3"
            />
          )}

          {/* Line or bar */}
          {type === 'line' || type === 'area' ? (
            <path
              d={generateLinePath()}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            // Bar chart
            data.values.map((value, index) => (
              <rect
                key={index}
                x={xScale(index) - 15}
                y={yScale(value)}
                width="30"
                height={graphHeight - (yScale(value) - padding.top)}
                fill="url(#barGradient)"
                rx="4"
              />
            ))
          )}

          {/* Data points */}
          {(type === 'line' || type === 'area') && data.values.map((value, index) => (
            <circle
              key={index}
              cx={xScale(index)}
              cy={yScale(value)}
              r="4"
              fill="white"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              className="transition-all duration-200 cursor-pointer hover:r-6"
            />
          ))}

          {/* Gradients */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-center mt-4 space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-linear-to-r from-blue-500 to-purple-600"></div>
            <span className="text-sm text-gray-600">Revenue</span>
          </div>
          <div className="text-sm text-gray-500">
            ↑ 24% from last period
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricChart;