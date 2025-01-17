'use client';

import { X, Send } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

export default function DemoRequestModal({ isOpen, onClose, serviceName }: DemoRequestModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to API
    console.log('Form submitted:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full sm:max-w-lg">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
            <h3 className="text-xl font-semibold mb-4">
              Agende Demonstração - {serviceName}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className={cn(
                    "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2",
                    "focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  )}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className={cn(
                    "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2",
                    "focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  )}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Entidade
                </label>
                <input
                  type="text"
                  id="company"
                  required
                  className={cn(
                    "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2",
                    "focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  )}
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Mensagem (Opcional)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={cn(
                    "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2",
                    "focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  )}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className={cn(
                  "w-full flex justify-center items-center px-4 py-2 border border-transparent",
                  "text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                )}
              >
                <Send className="h-4 w-4 mr-2" />
                Entrar em Contato
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}