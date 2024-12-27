import PartnerCard from '@/components/cards/PartnerCard';
import type { Partner } from '@/types/partner';
import Loading from '@/components/Loading';

interface PartnersSectionProps {
  loading: boolean;
  partners: Partner[];
}

export default function PartnersSection({ loading, partners }: PartnersSectionProps) {
  return (
    <section className="py-16" aria-label="Nossos Parceiros">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Nossos Parceiros</h2>
          <p className="mt-4 text-xl text-gray-600">
            Instituições de líderes que confiam em nossas soluções
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {loading ? (
            <Loading />
          ) : (
            partners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}