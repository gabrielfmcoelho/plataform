import { Metadata } from 'next';
import AboutPage from '@/components/pages/About';
import { getTeamMembers, getTeamNews, getPartners } from '@/services/api';

export const metadata: Metadata = {
  title: 'About Us - Solude Health Tech',
  description: 'Learn about our mission, team, and commitment to transforming healthcare through innovative technology solutions.',
  openGraph: {
    title: 'About Solude Health Tech',
    description: 'Meet our team of healthcare technology experts.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef',
        width: 1200,
        height: 630,
      },
    ],
  },
};

async function getPageData() {
  const [teamMembers, teamNews, partners] = await Promise.all([
    getTeamMembers(),
    getTeamNews(),
    getPartners(),
  ]);

  return {
    teamMembers: teamMembers.data,
    teamNews: teamNews.data,
    partners: partners.data,
  };
}

export default async function Page() {
  const data = await getPageData();
  return <AboutPage {...data} />;
}