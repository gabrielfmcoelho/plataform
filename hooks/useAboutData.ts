'use client';

import { useState, useEffect } from 'react';
import { getTeamMembers, getTeamNews, getPartners } from '@/services/api';
import type { TeamMember, TeamNews } from '@/types/team';
import type { Partner } from '@/types/partner';

export function useAboutData() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamNews, setTeamNews] = useState<TeamNews[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [teamMembersRes, teamNewsRes, partnersRes] = await Promise.all([
          getTeamMembers(),
          getTeamNews(),
          getPartners(),
        ]);

        setTeamMembers(teamMembersRes.data);
        setTeamNews(teamNewsRes.data);
        setPartners(partnersRes.data);
      } catch (err) {
        setError('Failed to load about page data');
        console.error('Error loading about page data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    teamMembers,
    teamNews,
    partners,
    loading,
    error,
  };
}