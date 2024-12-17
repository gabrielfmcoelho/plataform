import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Organization {
  id: string;
  name: string;
  type: string;
  users: any[];
  subscribedServices: string[];
}

interface Service {
  id: string;
  name: string;
}

interface OrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (organization: Organization) => void;
  organization: Organization | null;
  services: Service[];
}

export default function OrganizationModal({
  isOpen,
  onClose,
  onSave,
  organization,
  services,
}: OrganizationModalProps) {
  const [formData, setFormData] = useState<Organization>({
    id: '',
    name: '',
    type: 'Hospital',
    users: [],
    subscribedServices: [],
  });

  useEffect(() => {
    if (organization) {
      setFormData(organization);
    } else {
      setFormData({
        id: '',
        name: '',
        type: 'Hospital',
        users: [],
        subscribedServices: [],
      });
    }
  }, [organization]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(organization ? { ...formData, id: organization.id } : { ...formData, id: String(Date.now()) });
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
              {organization ? 'Edit Organization' : 'Add New Organization'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Organization Name
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
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  id="type"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="Hospital">Hospital</option>
                  <option value="Clinic">Clinic</option>
                  <option value="Laboratory">Laboratory</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subscribed Services
                </label>
                <div className="space-y-2">
                  {services.map((service) => (
                    <label key={service.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.subscribedServices.includes(service.id)}
                        onChange={(e) => {
                          const updatedServices = e.target.checked
                            ? [...formData.subscribedServices, service.id]
                            : formData.subscribedServices.filter(id => id !== service.id);
                          setFormData({ ...formData, subscribedServices: updatedServices });
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{service.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-5 sm:mt-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {organization ? 'Save Changes' : 'Add Organization'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}