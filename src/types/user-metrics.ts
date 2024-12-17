export interface ServiceUsageMetric {
  serviceId: string;
  totalTimeSpent: number; // in minutes
  lastAccess: string;
  accessCount: number;
  averageSessionDuration: number;
}

export interface UserMetrics {
  userId: string;
  serviceUsage: ServiceUsageMetric[];
  totalLogins: number;
  lastLogin: string;
  favoriteServices: string[];
  reportsGenerated: number;
  pipelinesInitiated: number;
  lastActive: string;
}