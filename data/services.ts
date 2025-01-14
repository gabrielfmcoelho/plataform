import { serviceIcons } from '@/lib/utils/serviceIcons';
import type { ApplicationService, CompanyService } from '@/types/service';

export const mockApplicationsServices: ApplicationService[] = [
  {
    id: 1,
    name: 'Resistracker',
    icon: serviceIcons['Clinical'],
    tagline: 'Gestão Inteligente de Resistência Bacteriana',
    description: 'Sistema avançado de monitoramento que utiliza IA para prever padrões de resistência bacteriana e otimizar tratamentos antibióticos.',
    benefits: [
      'Redução de 40% no tempo de identificação de padrões de resistência',
      'Aumento de 60% na eficácia do tratamento inicial',
      'Economia de 30% nos custos com antibióticos',
    ],
    features: [
      'Monitoramento em tempo real',
      'Análise preditiva de resistência',
      'Suporte à decisão clínica',
      'Relatórios personalizados',
    ],
    tags: ['IA', 'Microbiologia', 'Antibióticos'],
    screenshot: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&h=600&fit=crop',
    appRoute: '',
    appDocsRoute: '',
    appRepositories: [],
    lastApplicationUpdate: '2024-03-15',
    applicationStatus: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
    deletedAt: ''
  },
  // ... other application services
];

export const mockCompanyServices: CompanyService[] = [
  {
    id: 1,
    name: 'Assessoria',
    title: 'Assessoria',
    description: 'Consultoria especializada para otimização de processos hospitalares',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
    deletedAt: ''
  },
  // ... other company services
]; 