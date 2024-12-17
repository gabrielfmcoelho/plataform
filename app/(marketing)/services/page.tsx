import { Metadata } from 'next';
import LandingPage from '@/components/pages/Landing';
import { getApplicationServices, getPartners } from '@/services/api';

export const metadata: Metadata = {
  title: 'Our Services - Solude Health Tech',
  description: 'Discover our comprehensive suite of healthcare management solutions designed to improve efficiency and patient care.',
  openGraph: {
    title: 'Healthcare Management Solutions',
    description: 'Transform your healthcare operations with our innovative services.',
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
  const [services, partners] = await Promise.all([
    getApplicationServices(),
    getPartners(),
  ]);

  return {
    services: services.data,
    partners: partners.data,
  };
}

export default async function Page() {
  const data = await getPageData();
  return <LandingPage {...data} />;
}