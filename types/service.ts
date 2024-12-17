import { LucideIcon } from 'lucide-react';

export interface BaseService {
  id: string | number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface ApplicationService extends BaseService {
  icon: LucideIcon;
  tagline: string;
  benefits: string[];
  features: string[];
  tags: string[];
  screenshot: string;
  appRoute: string;
  appDocsRoute: string;
  appRepositories: string[];
  lastApplicationUpdate: string;
  applicationStatus: boolean;
}

export interface CompanyService extends BaseService {
  title: string;
  image: string;
}

export interface Service extends BaseService {
  tag: string;
  isSubscribed: boolean;
  lastUpdate: string;
  price: number;
  isPinned?: boolean;
  icon: LucideIcon;
  imageUrl: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ServiceNews {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  imageUrl: string;
}