import { useState } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import type { ServiceCategory } from '../../types/service';
import CategoryModal from './CategoryModal';
import { serviceIcons } from '../../utils/serviceIcons';

interface CategoriesTabProps {
  categories: ServiceCategory[];
  onAddCategory: (category: ServiceCategory) => void;
  onEditCategory: (category: ServiceCategory) => void;
  onDeleteCategory: (id: string) => void;
}

export default function CategoriesTab({
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
}: CategoriesTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const handleEditCategory = (category: ServiceCategory) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleSaveCategory = (category: ServiceCategory) => {
    if (editingCategory) {
      onEditCategory(category);
    } else {
      onAddCategory(category);
    }
    setShowModal(false);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={handleAddCategory}
          className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => {
          const Icon = serviceIcons[category.icon];
          return (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {Icon && <Icon className="h-6 w-6 text-blue-600" />}
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="p-1 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeleteCategory(category.id)}
                    className="p-1 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </div>
          );
        })}
      </div>

      <CategoryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveCategory}
        category={editingCategory}
      />
    </div>
  );
}