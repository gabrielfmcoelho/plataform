import type { Pipeline, DataSource } from 'types/pipeline';

const mockDataSources: DataSource[] = [
  {
    id: 1,
    name: 'Hospital EHR System',
    type: 'database',
    connectionString: 'postgresql://localhost:5432/ehr',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-15T00:30:00Z',
    deletedAt: ''
  },
  {
    id: 2,
    name: 'Lab Results API',
    type: 'api',
    apiEndpoint: 'https://api.lab.example.com/v1',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-15T00:30:00Z',
    deletedAt: ''
  },
  {
    id: 3,
    name: 'Pharmacy System',
    type: 'service',
    serviceId: 'pharmawatch',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-15T00:30:00Z',
    deletedAt: ''
  },
];

export const mockPipelines: Pipeline[] = [
  {
    id: 1,
    name: 'Antibiotic Resistance Analysis',
    description: 'Daily analysis of antibiotic resistance patterns from lab results',
    organizationIds: [1,2,3],
    serviceIds: [1, 2],
    dataSources: [1, 2],
    schedule: 'Daily',
    lastRun: '2024-03-15T00:00:00Z',
    nextRun: '2024-03-16T00:00:00Z',
    status: 'Healthy',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-15T00:30:00Z',
    deletedAt: ''
  },
  {
    id: 2,
    name: 'Pharmacy Stock Analysis',
    description: 'Weekly analysis of pharmacy stock levels and usage patterns',
    organizationIds: [1,2,4],
    serviceIds: [4],
    dataSources: [3],
    schedule: 'Weekly',
    lastRun: '2024-03-15T01:00:00Z',
    nextRun: '2024-03-22T01:00:00Z',
    status: 'Completed',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-15T02:00:00Z',
    deletedAt: ''
  },
];