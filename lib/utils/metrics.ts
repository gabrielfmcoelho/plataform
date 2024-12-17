import type { ServiceUsageMetric, UserMetrics } from '@/types/user-metrics';

export function calculateAverageSessionDuration(metrics: ServiceUsageMetric[]): number {
  if (!metrics.length) return 0;
  return metrics.reduce((acc, m) => acc + m.averageSessionDuration, 0) / metrics.length;
}

export function calculateTotalTimeSpent(metrics: ServiceUsageMetric[]): number {
  return metrics.reduce((acc, m) => acc + m.totalTimeSpent, 0);
}

export function getMostUsedServices(metrics: UserMetrics): string[] {
  return metrics.serviceUsage
    .sort((a, b) => b.totalTimeSpent - a.totalTimeSpent)
    .slice(0, 5)
    .map(m => m.serviceId.toString());
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}