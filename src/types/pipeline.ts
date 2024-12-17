export type PipelineStatus = 'pending' | 'running' | 'completed' | 'failed' | 'paused';

export interface PipelineStep {
  id: string;
  name: string;
  status: PipelineStatus;
  startTime: string;
  endTime?: string;
  error?: string;
}

export interface DataSource {
  id: string;
  name: string;
  type: 'database' | 'api' | 'file' | 'service';
  connectionString?: string;
  apiEndpoint?: string;
  filePath?: string;
  serviceId?: string;
  credentials?: Record<string, string>;
  lastSync: string;
  status: 'active' | 'inactive' | 'error';
}

export interface Pipeline {
  id: string;
  name: string;
  description: string;
  organizationId: string;
  serviceIds: string[];
  dataSources: DataSource[];
  steps: PipelineStep[];
  schedule: string;
  lastRun: string;
  nextRun: string;
  status: PipelineStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}