export interface ServiceConfig {
  serviceId: number;
  isPinned: boolean;
  customSettings?: Record<string, any>;
  notifications?: {
    email: boolean;
    push: boolean;
    frequency: 'realtime' | 'daily' | 'weekly';
  };
}

export interface UserConfig {
  id: number;
  userId: number;
  serviceConfigs: ServiceConfig[];
  theme?: 'light' | 'dark' | 'system';
  language?: string;
  timezone?: string;
  dashboardLayout?: {
    widgets: Array<{
      id: string;
      position: { x: number; y: number };
      size: { width: number; height: number };
    }>;
  };
}