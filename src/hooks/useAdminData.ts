import { useState, useEffect } from 'react';
import { getUsers } from '../services/users';
import { getOrganizations } from '../services/organizations';
import { getApplicationServices } from '../services/application-services';
import { getPipelines } from '../services/pipelines';
import type { User } from '../types/user';
import type { Organization } from '../types/organization';
import type { ApplicationService } from '../types/service';
import type { Pipeline } from '../types/pipeline';

export function useAdminData() {
  const [users, setUsers] = useState<User[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [services, setServices] = useState<ApplicationService[]>([]);
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [usersRes, orgsRes, servicesRes, pipelinesRes] = await Promise.all([
          getUsers(),
          getOrganizations(),
          getApplicationServices(),
          getPipelines(),
        ]);

        setUsers(usersRes.data);
        setOrganizations(orgsRes.data);
        setServices(servicesRes.data);
        setPipelines(pipelinesRes.data);
      } catch (err) {
        setError('Failed to load admin data');
        console.error('Error loading admin data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    users,
    organizations,
    services,
    pipelines,
    loading,
    error,
  };
}