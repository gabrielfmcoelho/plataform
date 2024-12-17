import { User } from './user';

export interface Organization {
  id: number;
  name: string;
  logoUrl: string;
  type: 'SuperAdmin' | 'Hospital' | 'Clinic';
  users: number[];
  subscribedServices: number[];
  pipelines: number[];
  subscription: boolean | null;
  subscriptionValue: number | null;
  subscriptionPeriod: string | null;
  subscriptionUsersLimit: number | null;
  subscriptionReportsLimit: number | null;
  subscriptionLastReport: string | null;
  subscriptionEmittedReports: number | null;
  subscriptionNextReport: string | null;
  subscriptionInitDate: string | null;
  subscriptionEndDate: string | null;
  subscriptionUpdatedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}