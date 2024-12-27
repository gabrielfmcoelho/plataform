import { Metadata } from 'next';
import LandingPage from '@/components/pages/Landing';

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

export default async function Page() {
  return <LandingPage />;
}