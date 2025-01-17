import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { serviceSchema } from '@/lib/utils/validation';
import type { HubService } from '@/types/service';
import { serviceIcons } from '@/lib/utils/serviceIcons';
import { cn } from '@/lib/utils/cn';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: HubService) => void;
  service: HubService | null;
}

export default function ServiceModal({ isOpen, onClose, onSave, service }: ServiceModalProps) {
  const [formData, setFormData] = useState<Omit<HubService, 'id'>>({
    name: '',
    description: '',
    tag: 'Clinical',
    isSubscribed: false,
    lastUpdate: new Date().toISOString(),
    price: 0,
    isPinned: false,
    icon: serviceIcons['Clinical'],
    imageUrl: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (service) {
      const { id, ...serviceData } = service;
      setFormData(serviceData);
    } else {
      setFormData({
        name: '',
        description: '',
        tag: 'Clinical',
        isSubscribed: false,
        lastUpdate: new Date().toISOString(),
        price: 0,
        isPinned: false,
        icon: serviceIcons['Clinical'],
        imageUrl: '',
      });
    }
    setErrors({});
  }, [service]);

  const validateField = (name: string, value: any) => {
    try {
      serviceSchema.shape[name].parse(value);
      setErrors(prev => ({ ...prev, [name]: '' }));
    } catch (error) {
      if (error instanceof Error) {
        setErrors(prev => ({ ...prev, [name]: error.message }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? parseFloat(value) : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    validateField(name, newValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = serviceSchema.parse(formData);
      await onSave(service ? { ...validatedData, id: service.id } : { ...validatedData, id: Date.now().toString() });
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setErrors(prev => ({ ...prev, submit: error.message }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              {service ? 'Edit Service' : 'Add New Service'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.submit && (
                <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm">
                  {errors.submit}
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Service Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className={cn(
                    "mt-1 block w-full rounded-md px-3 py-2",
                    "border focus:outline-none focus:ring-2 focus:ring-offset-2",
                    errors.name 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  )}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Add similar validation UI for other fields */}

              <button
                type="submit"
                disabled={isSubmitting || Object.keys(errors).length > 0}
                className={cn(
                  "w-full flex justify-center py-2 px-4 border border-transparent rounded-md",
                  "text-sm font-medium text-white transition-colors",
                  isSubmitting || Object.keys(errors).length > 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                )}
              >
                {isSubmitting ? 'Saving...' : service ? 'Save Changes' : 'Add Service'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}