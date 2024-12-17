import type { Partner } from '@/types/partner';

interface PartnerCardProps {
  partner: Partner;
}

export default function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <div className="col-span-1 flex justify-center items-center py-8 px-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <img
        className="max-h-12 object-contain"
        src={partner.logo}
        alt={partner.name}
        title={partner.description}
      />
    </div>
  );
}