import { User } from './user';

export interface Organization {
  id: string;
  name: string;
  type: string;
  users: User[];
  subscribedServices: string[];
}