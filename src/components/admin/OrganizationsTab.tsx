import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import type { Organization, Service, User } from '../../types';
import OrganizationModal from '../OrganizationModal';
import { APP_TEXTS } from '../../constants/texts';

interface OrganizationsTabProps {
  organizations: Organization[];
  services: Service[];
  users: User[];
}

export default function OrganizationsTab({
  organizations,
  services,
  users,
}: OrganizationsTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);

  const handleAddOrg = () => {
    setEditingOrg(null);
    setShowModal(true);
  };

  const handleEditOrg = (org: Organization) => {
    setEditingOrg(org);
    setShowModal(true);
  };

  const handleSaveOrg = (org: Organization) => {
    // TODO: Implement organization save logic
    setShowModal(false);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search organizations..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={handleAddOrg}
          className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Organization
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Users
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Services
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {organizations
              .filter(org =>
                org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                org.type.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((org) => (
                <tr key={org.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{org.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{org.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{org.users.length} users</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {org.subscribedServices.length} services
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditOrg(org)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <OrganizationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveOrg}
        organization={editingOrg}
        services={services}
      />
    </div>
  );
}