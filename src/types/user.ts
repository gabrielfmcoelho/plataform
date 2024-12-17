export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff' | 'guest';
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