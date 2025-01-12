import type { UserMetrics } from '@/types/user-metrics';

export const mockUserMetrics: UserMetrics[] = [
  {
    id: 1,
    userId: 1,
    serviceUsage: [
      {
        serviceId: 1,
        totalTimeSpent: 3600, // 60 hours
        lastAccess: '2024-03-15T10:30:00Z',
        accessCount: 45,
        averageSessionDuration: 80, // minutes
      },
      {
        serviceId: 2,
        totalTimeSpent: 1800, // 30 hours
        lastAccess: '2024-03-14T15:45:00Z',
        accessCount: 23,
        averageSessionDuration: 45, // minutes
      },
    ],
    totalLogins: 68,
    lastLogin: '2024-03-15T09:30:00Z',
    favoriteServices: ['1', '2'],
    lastActive: '2024-03-15T10:30:00Z',
  },
  {
    id: 2,
    userId: 2,
    serviceUsage: [
      {
        serviceId: 1,
        totalTimeSpent: 2400, // 40 hours
        lastAccess: '2024-03-15T09:15:00Z',
        accessCount: 32,
        averageSessionDuration: 75, // minutes
      },
    ],
    totalLogins: 45,
    lastLogin: '2024-03-15T08:45:00Z',
    favoriteServices: ['1'],
    lastActive: '2024-03-15T09:15:00Z',
  }
];