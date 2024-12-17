import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Calendar } from 'lucide-react';
import { Service } from '../types';
import { serviceIcons } from '../utils/serviceIcons';

interface ServiceUsageData {
  week: string;
  [key: string]: number | string;
}

// Mock data generator for the past 12 weeks
const generateMockData = (services: Service[]): ServiceUsageData[] => {
  const weeks = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (i * 7));
    return date.toISOString().split('T')[0];
  }).reverse();

  return weeks.map(week => {
    const data: ServiceUsageData = { week };
    services.forEach(service => {
      // Generate random usage hours between 10 and 100
      data[service.name] = Math.floor(Math.random() * 90) + 10;
    });
    return data;
  });
};

interface ServiceUsageChartProps {
  services: Service[];
}

const CHART_COLORS = [
  '#2563eb', // blue-600
  '#16a34a', // green-600
  '#9333ea', // purple-600
  '#dc2626', // red-600
  '#ca8a04', // yellow-600
  '#0891b2', // cyan-600
];

export default function ServiceUsageChart({ services }: ServiceUsageChartProps) {
  const [dateRange, setDateRange] = useState<string>('12w');
  const data = generateMockData(services);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Service Usage Over Time</h3>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="4w">Last 4 weeks</option>
            <option value="12w">Last 12 weeks</option>
            <option value="24w">Last 24 weeks</option>
          </select>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="week"
              tickFormatter={(value) => {
                const date = new Date(value);
                return `Week ${Math.ceil((date.getDate() + date.getDay()) / 7)}`;
              }}
            />
            <YAxis
              label={{ value: 'Hours', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value} hours`,
                name,
              ]}
            />
            <Legend />
            {services.map((service, index) => {
              const Icon = serviceIcons[service.tag];
              return (
                <Line
                  key={service.name}
                  type="monotone"
                  dataKey={service.name}
                  stroke={CHART_COLORS[index % CHART_COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name={
                    <span className="flex items-center space-x-1">
                      <Icon className="h-4 w-4" />
                      <span>{service.name}</span>
                    </span>
                  }
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}