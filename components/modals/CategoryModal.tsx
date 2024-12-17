import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { ServiceCategory } from '@/types/service';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: ServiceCategory) => void;
  category: ServiceCategory | null;
}

export default function CategoryModal({
  isOpen,
  onClose,
  onSave,
  category,
}: CategoryModalProps) {
  const [formData, setFormData] = useState<Omit<ServiceCategory, 'id'>>({
    name: '',
    description: '',
    icon: 'Clinical',
  });

  useEffect(() => {
    if (category) {
      const { id, ...categoryData } = category;
      setFormData(categoryData);
    } else {
      setFormData({
        name: '',
        description: '',
        icon: 'Clinical',
      });
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(category ? { ...formData, id: category.id } : { ...formData, id: Date.now().toString() });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              {category ? 'Edit Category' : 'Add New Category'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Category Name
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
                <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                  Icon
                </label>
                <select
                  id="icon"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                >
                  <option value="Clinical">Clinical</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Analytics">Analytics</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Research">Research</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {category ? 'Save Changes' : 'Add Category'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}