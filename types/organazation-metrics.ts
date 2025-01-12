export interface OrganizationMetrics {
    id: number;
    organizationId: number;
    periodAlong?: string | null;
    users?: number | null;
    reports?: number | null;
    lastReport?: string | null;
    nextReport?: string | null;
    updatedAt: string;
}