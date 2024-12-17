export type PipelineStatus = 'Healthy' | 'Warning' | 'Error' | 'Completed';

export interface DataSource {
  id: number;
  name: string;
  type: 'database' | 'api' | 'service';
  connectionString?: string;
  apiEndpoint?: string;
  serviceId?: string;
  status: 'active' | 'inactive' | 'error';
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface Pipeline {
  id: number;
  name: string;
  description: string;
  organizationIds: number[];
  serviceIds: number[];
  dataSources: number[];
  schedule: string;
  lastRun: string;
  nextRun: string;
  status: PipelineStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}