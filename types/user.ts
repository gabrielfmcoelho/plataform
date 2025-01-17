export type UserRole = 'admin' | 'manager' | 'staff' | 'guest';

export interface AuthUser {
  id: number;
  roleId: number;
  email: string;
  organizationId: number;
  organizationRoleId: number;
  organizationName: string;
}

export interface PublicUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  lastLogin?: string | null;
}

export interface CreateUser {
  organizationId: number;
  name: string;
  prefix?: string | null;
  email: string;
  password?: string | null;
  role: UserRole;
}

export interface User {
  id: number;
  organizationId?: number | null;
  name: string;
  prefix?: string | null;
  email: string;
  role: UserRole;
  configId?: number | null;
  metricsId?: number | null;
  lastLogin?: string | null;
}

export interface AccessLog {
  id: string;
  userId: string;
  userName: string;
  service: string;
  timestamp: string;
  action: string;
}