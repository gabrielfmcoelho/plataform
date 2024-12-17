export interface ServiceUsageMetric {
  serviceId: string | number;
  totalTimeSpent: number;
  lastAccess: string;
  accessCount: number;
  averageSessionDuration: number;
}

export interface UserMetrics {
  id: number;
  userId: number;
  serviceUsage: ServiceUsageMetric[];
  totalLogins: number;
  lastLogin: string;
  favoriteServices: string[];
  lastActive: string;
}