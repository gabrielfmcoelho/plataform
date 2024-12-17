export type UserRole = 'admin' | 'manager' | 'staff' | 'guest';

export interface User {
  id: number;
  organizationId: number;
  name: string;
  prefix: string | null;
  email: string;
  password: string;
  role: UserRole;
  configId: number;
  metrisId: number;
  lastLogin?: string;
}

export interface AccessLog {
  id: string;
  userId: string;
  userName: string;
  service: string;
  timestamp: string;
  action: string;
}