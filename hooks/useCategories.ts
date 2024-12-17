'use client';

import { useState, useEffect } from 'react';
import type { ServiceCategory } from '@/types/service';

const mockCategories: ServiceCategory[] = [
  {
    id: '1',
    name: 'Clinical',
    description: 'Clinical services and patient care',
    icon: 'Clinical',
  },
  {
    id: '2',
    name: 'Laboratory',
    description: 'Laboratory and diagnostic services',
    icon: 'Laboratory',
  },
  {
    id: '3',
    name: 'Analytics',
    description: 'Data analytics and reporting',
    icon: 'Analytics',
  },
];

export function useCategories() {
  const [categories, setCategories] = useState<ServiceCategory[]>(mockCategories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addCategory = async (category: Omit<ServiceCategory, 'id'>) => {
    try {
      const newCategory = {
        ...category,
        id: Date.now().toString(),
      };
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  };

  const editCategory = async (category: ServiceCategory) => {
    try {
      setCategories(prev => prev.map(c => c.id === category.id ? category : c));
      return category;
    } catch (error) {
      console.error('Error editing category:', error);
      throw error;
    }
  };

  const removeCategory = async (id: string) => {
    try {
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error removing category:', error);
      throw error;
    }
  };

  return {
    categories,
    loading,
    error,
    addCategory,
    editCategory,
    removeCategory,
  };
}