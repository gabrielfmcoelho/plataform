'use client';

import { ChevronDown } from 'lucide-react';

interface HubFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  tags: string[];
  selectedTag: string;
  onTagChange: (value: string) => void;
  filterSubscribed: boolean | null;
  onFilterChange: (value: boolean | null) => void;
}

export default function HubFilters({
  searchTerm,
  onSearchChange,
  tags,
  selectedTag,
  onTagChange,
  filterSubscribed,
  onFilterChange,
}: HubFiltersProps) {
  return (
    <section aria-label="Filtros de Busca" className="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Buscar serviços..."
        aria-label="Buscar serviços"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      
      <div className="relative">
        <select
          className="appearance-none px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          value={selectedTag}
          onChange={(e) => onTagChange(e.target.value)}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag === 'all' ? 'All Categories' : tag}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>

      <select
        aria-label="Filtrar por status"
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={filterSubscribed === null ? '' : filterSubscribed.toString()}
        onChange={(e) => onFilterChange(e.target.value === '' ? null : e.target.value === 'true')}
      >
        <option value="">Todos os Serviços</option>
        <option value="true">Assinados</option>
        <option value="false">Não Assinados</option>
      </select>
    </section>
  );
}
