import { useState, useEffect } from 'react';
import { 
    getOrganizationUsers,
    getOrganizationMetrics 
} from '@/services/api';
import type { User } from '@/types/user';
import type { UserMetrics } from '@/types/user-metrics';

export function useSettingsData(userId: number) {
  const [users, setUsers] = useState<User[]>([]);
  const [metrics, setMetrics] = useState<UserMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [usersRes, metricsRes] = await Promise.all([
          getOrganizationUsers(3),
          getOrganizationMetrics(userId),
        ]);

        setUsers(usersRes.data);
        setMetrics(metricsRes.data);
      } catch (err) {
        setError('Failed to load settings data');
        console.error('Error loading settings data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  return { users, metrics, loading, error };
}