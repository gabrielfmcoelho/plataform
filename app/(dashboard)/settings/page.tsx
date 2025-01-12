'use client';

import { useSession } from 'next-auth/react';
import UserManagement from '@/components/UserManagement';
import UsageChart from '@/components/charts/UsageChart';
import { History, Crown } from 'lucide-react';
import { useSettingsData } from '@/hooks/useSettingsData';

export default function SettingsPage() {
  const { data: session } = useSession();
  const { users, metrics, loading, error } = useSettingsData(session?.user?.id);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your hospital system settings</p>
      </div>

      <div className="grid gap-6">
        {/* Settings sections */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Crown className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold">Current Plan</h2>
          </div>
          {/* Plan details */}
        </div>

        {metrics && <UsageChart metrics={metrics} />}
        
        {users && (
          <UserManagement
            users={users}
            onAddUser={() => {}}
            onEditUser={() => {}}
            onDeleteUser={() => {}}
          />
        )}
      </div>
    </div>
  );
}