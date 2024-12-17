import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Building2, Users, LineChart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useServices } from '../hooks/useServices';
import { useUsers } from '../hooks/useUsers';
import MetricsDashboard from '../components/MetricsDashboard';
import ServicesTab from '../components/admin/ServicesTab';
import OrganizationsTab from '../components/admin/OrganizationsTab';
import UsersTab from '../components/admin/UsersTab';
import { useAdminData } from '../hooks/useAdminData';
import { APP_TEXTS } from '../constants/texts';

type TabType = 'services' | 'organizations' | 'users' | 'metrics';

export default function Admin() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('services');
  const {
    users,
    organizations,
    services,
    pipelines,
    loading,
    error
  } = useAdminData();

  if (!isAdmin) {
    navigate('/login');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  const tabs = [
    { id: 'services', label: APP_TEXTS.ADMIN.TABS.SERVICES, icon: Package },
    { id: 'organizations', label: APP_TEXTS.ADMIN.TABS.ORGANIZATIONS, icon: Building2 },
    { id: 'users', label: APP_TEXTS.ADMIN.TABS.USERS, icon: Users },
    { id: 'metrics', label: 'Metrics', icon: LineChart },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{APP_TEXTS.ADMIN.TITLE}</h1>
        <p className="mt-2 text-gray-600">{APP_TEXTS.ADMIN.SUBTITLE}</p>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`
                    group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                    ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon
                    className={`-ml-0.5 mr-2 h-5 w-5 ${
                      activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'services' && (
        <ServicesTab
          services={services}
          loading={servicesLoading}
          onAddService={addService}
          onEditService={editService}
          onDeleteService={removeService}
        />
      )}

      {activeTab === 'organizations' && (
        <OrganizationsTab
          organizations={mockOrganizations}
          services={services}
          users={users}
        />
      )}

      {activeTab === 'users' && (
        <UsersTab
          users={users}
          loading={usersLoading}
          onAddUser={addUser}
          onEditUser={editUser}
          onDeleteUser={removeUser}
        />
      )}

      {activeTab === 'metrics' && (
        <MetricsDashboard
          metrics={mockMetrics}
          organizations={mockOrganizations}
          logs={mockLogs}
          services={services}
        />
      )}
    </div>
  );
}