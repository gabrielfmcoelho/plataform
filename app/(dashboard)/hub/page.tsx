import { Suspense } from 'react';
import Loading from '@/components/Loading';
import HubContent from '@/components/pages/Hub';

export default function HubPage() {
  return (
    <Suspense fallback={<Loading />}>
      <HubContent />
    </Suspense>
  );
}

export const metadata = {
  title: 'Hub de Aplicações',
  description: 'Gerencie e descubra serviços hospitalares integrados.'
};