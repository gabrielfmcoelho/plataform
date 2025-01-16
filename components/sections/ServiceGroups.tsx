'use client';

import { HubService } from '@/types/service';
import ServiceCard from '@/components/cards/ServiceCard';

interface ServiceGroupsProps {
  groupedServices: Record<string, HubService[]>;
  onTogglePin: (serviceId: number) => void;
  onEdit: (service: HubService) => void;
  onDelete: (serviceId: number) => void;
}

export default function ServiceGroups({ groupedServices, onTogglePin, onEdit, onDelete }: ServiceGroupsProps) {
  return (
    <>
      {Object.entries(groupedServices).map(([tag, services]) => (
        <section key={tag} aria-label={`Serviços ${tag}`} className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {tag === 'all' ? 'Todas as Categorias' : tag}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onTogglePin={() => onTogglePin(service.id)}
                onEdit={() => onEdit(service)}
                onDelete={() => onDelete(service.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
