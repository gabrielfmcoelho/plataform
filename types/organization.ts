export type OrganizationType = "SuperAdmin" | "Hospital" | "Clinic";

export interface Organization {
  id: number;
  name: string;
  logoUrl: string;
  type: OrganizationType;
  users: number[];
  subscribedServices: number[];
  pipelines: number[];
  subscription: boolean | null;
  subscriptionValue: number | null;
  subscriptionPeriod: string | null;
  subscriptionUsersLimit: number | null;
  subscriptionReportsLimit: number | null;
  subscriptionInitDate: string | null;
  subscriptionEndDate: string | null;
  subscriptionUpdatedAt: string | null;
  organizationMetricsId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}