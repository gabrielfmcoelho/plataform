import PartnerCard from '@/components/cards/PartnerCard';
import type { Partner } from '@/types/partner';

interface PartnersSectionProps {
  partners: Partner[];
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Nossos Parceiros</h2>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </div>
    </div>
  );
}