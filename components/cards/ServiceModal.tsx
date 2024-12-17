'use client';

import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Service } from '@/types/service';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Service) => void;
  service: Service | null;
}

const initialFormState: Omit<Service, 'id'> = {
  name: '',
  description: '',
  tag: 'Clinical',
  isSubscribed: false,
  lastUpdate: new Date().toISOString().split('T')[0],
  price: 0,
  isPinned: false,
};

export default function ServiceModal({ isOpen, onClose, onSave, service }: ServiceModalProps) {
  const [formData, setFormData] = useState<Omit<Service, 'id'>>(initialFormState);

  useEffect(() => {
    if (service) {
      const { id, ...serviceData } = service;
      setFormData(serviceData);
    } else {
      setFormData(initialFormState);
    }
  }, [service]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(service ? { ...formData, id: service.id } : { ...formData, id: String(Date.now()) });
    setFormData(initialFormState);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full sm:my-8 sm:max-w-lg">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
            <h3 className="text-xl font-semibold mb-4">
              {service ? 'Edit Service' : 'Add New Service'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Service Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="tag" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="tag"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                >
                  <option value="Clinical">Clinical</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Analytics">Analytics</option>
                  <option value="Financial">Financial</option>
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price ($/month)
                </label>
                <input
                  type="number"
                  id="price"
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isSubscribed"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={formData.isSubscribed}
                  onChange={(e) => setFormData({ ...formData, isSubscribed: e.target.checked })}
                />
                <label htmlFor="isSubscribed" className="ml-2 block text-sm text-gray-700">
                  Subscribed
                </label>
              </div>

              <div className="mt-5 sm:mt-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {service ? 'Save Changes' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
