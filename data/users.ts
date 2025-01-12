import type { User } from '@/types/user';


export const mockUsers: User[] = [
  {
    id: 1,
    organizationId: 3,
    name: 'Sarah Johnson',
    prefix: 'Dr(a).',
    email: 'sarah.j@hospital.com',
    role: 'admin',
    configId: 1,
    metricsId: 1,
  },
  {
    id: 2,
    organizationId: 4,
    name: 'Emily Chen',
    prefix: null,
    email: 'e.chen@hospital.com',
    role: 'staff',
    configId: 2,
    metricsId: 2,
  },
  {
    id: 3,
    organizationId: null,
    name: 'Guest User',
    prefix: null,
    email: 'guest@example.com',
    role: 'guest',
    configId: null,
    metricsId: null,
  }
];