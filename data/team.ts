import type { TeamMember, TeamNews } from '@/types/team';

export const mockTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Bruno Guedes',
    role: 'Diretor de Saúde',
    description: 'Doutor em microbiologia com experiência em gestão de projetos e evidências em saúde.',
    image: 'https://images.unsplash.com/', //400px x 400px
    linkedin: 'https://linkedin.com/in/',
    lattes: 'http://lattes.cnpq.br/',
    publications: [
      'Healthcare Analytics in Practice: A Case Study',
      'The Future of AI in Clinical Decision Making'
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
  {
    id: 2,
    name: 'Alone Santos',
    role: 'Diretor de Negócios',
    description: 'Advogado com ampla experiência em gestão de saúde, arrecadação municipal e vendas para o setor público.',
    image: 'https://images.unsplash.com/',
    linkedin: 'https://linkedin.com/in/',
    publications: [
      'Machine Learning Applications in Healthcare',
      'Building Scalable Healthcare Systems'
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
  {
    id: 3,
    name: 'José Maria',
    role: 'Diretor de Tecnologia',
    description: 'Doutor em teleinformática, com experiência em gestão de projetos de TI, análises de dados e modelos preditivos. ',
    image: 'https://images.unsplash.com/',
    linkedin: 'https://linkedin.com/in/',
    lattes: 'http://lattes.cnpq.br/',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
  {
    id: 4,
    name: 'Gabriel Coelho',
    role: '',
    description: '',
    image: 'https://images.unsplash.com/',
    linkedin: 'https://linkedin.com/in/',
    lattes: 'http://lattes.cnpq.br/',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
];

export const mockTeamNews: TeamNews[] = [
  {
    id: 1,
    title: 'Health Tech Solude é Finalista em Competição de Startups da Primeira Campus Party Weekend',
    description: 'Texto...',
    url: 'https://example.com/news/ai-clinical-decision-support',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop',
    authorId: 1,
    publishedAt: '2024-03-10T00:00:00Z',
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-03-10T00:00:00Z',
  },
  {
    id: 2,
    title: 'Modelo de IA para Inferência de IRA é Premiado em 1º Lugar no HU-UFPI',
    description: 'Texto...',
    url: 'https://example.com/news/analytics-milestone',
    imageUrl: 'https://images.unsplash.com/photo-1576091160101-2a8e2626cd14?w=800&h=400&fit=crop',
    authorId: 4,
    publishedAt: '2024-03-05T00:00:00Z',
    createdAt: '2024-03-05T00:00:00Z',
    updatedAt: '2024-03-05T00:00:00Z',
  },
];