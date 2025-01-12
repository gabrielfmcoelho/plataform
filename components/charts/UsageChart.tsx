'use client';

import { BarChart, Users, FileText, GitBranch } from 'lucide-react';
import type { UsageMetrics } from '@/types/metrics';

export default function UsageChart({ metrics }: { metrics: UsageMetrics }) {
  const features = [
    { name: 'Active Users', current: metrics.activeUsers, max: metrics.maxUsers, icon: Users },
    { name: 'Reports Generated', current: metrics.reportsGenerated, max: metrics.maxReports, icon: FileText },
    { name: 'Active Pipelines', current: metrics.activePipelines, max: metrics.maxPipelines, icon: GitBranch },
  ];

  return (
    <div>
      {features.map(({ name, current, max, icon: Icon }) => (
        <div key={name}>
          <span>{name}</span>
          <div>{current} / {max}</div>
        </div>
      ))}
    </div>
  );
}
