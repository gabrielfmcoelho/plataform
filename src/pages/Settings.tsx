import { useState } from 'react';
import UserManagement from '../components/UserManagement';
import UsageChart from '../components/UsageChart';
import type { User, AccessLog } from '../types';
import { History, Crown } from 'lucide-react';
import { useSettingsData } from '../hooks/useSettingsData';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const { users, metrics, loading, error } = useSettingsData(user?.id || 0);

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

  const handleAddUser = (newUser: User) => {
    setUsers([...users, { ...newUser, id: String(Date.now()) }]);
  };

  const handleEditUser = (updatedUser: User) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your hospital system settings</p>
      </div>

      <div className="grid gap-6">
        {/* Subscription Plan */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Crown className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold">Current Plan</h2>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900">Enterprise Plan</h3>
            <p className="text-blue-700 mt-1">Active until: December 31, 2024</p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center text-blue-700">
                <span className="mr-2">•</span>
                Unlimited users
              </li>
              <li className="flex items-center text-blue-700">
                <span className="mr-2">•</span>
                Premium support
              </li>
              <li className="flex items-center text-blue-700">
                <span className="mr-2">•</span>
                Custom integrations
              </li>
            </ul>
          </div>
        </div>

        {/* Usage Metrics */}
        <UsageChart metrics={mockMetrics} />

        {/* User Management */}
        <UserManagement
          users={users}
          onAddUser={handleAddUser}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />

        {/* Access Logs */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <History className="h-6 w-6 text-gray-500 mr-2" />
              <h2 className="text-xl font-semibold">Access Logs</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {log.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}