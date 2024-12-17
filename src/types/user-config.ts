export interface UserServiceConfig {
  serviceId: string;
  isPinned: boolean;
  customSettings: Record<string, any>;
  notifications: {
    email: boolean;
    push: boolean;
    frequency: 'realtime' | 'daily' | 'weekly';
  };
}

export interface UserConfig {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  serviceConfigs: UserServiceConfig[];
  dashboardLayout: {
    widgets: Array<{
      id: string;
      position: { x: number; y: number };
      size: { width: number; height: number };
    }>;
  };
}