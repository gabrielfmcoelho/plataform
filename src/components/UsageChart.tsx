import { BarChart, Users, FileText, GitBranch } from 'lucide-react';
import type { UsageMetrics } from '../types';

export default function UsageChart({ metrics }: { metrics: UsageMetrics }) {
  const features = [
    {
      name: 'Active Users',
      current: metrics.activeUsers,
      max: metrics.maxUsers,
      icon: Users,
    },
    {
      name: 'Reports Generated',
      current: metrics.reportsGenerated,
      max: metrics.maxReports,
      icon: FileText,
    },
    {
      name: 'Active Pipelines',
      current: metrics.activePipelines,
      max: metrics.maxPipelines,
      icon: GitBranch,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <div className="flex items-center mb-4">
        <BarChart className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-2" />
        <h2 className="text-lg sm:text-xl font-semibold">Usage Metrics</h2>
      </div>
      
      <div className="space-y-4">
        {features.map((feature) => (
          <div key={feature.name} className="space-y-2">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className="flex items-center">
                <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2" />
                <span className="text-sm sm:text-base font-medium text-gray-700">{feature.name}</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-600">
                {feature.current} / {feature.max}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${(feature.current / feature.max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}