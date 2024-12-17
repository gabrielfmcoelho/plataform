import { useState } from 'react';
import { Download, Calendar, Building2 } from 'lucide-react';
import { UsageMetrics, Organization, AccessLog, Service } from '../types';
import ServiceUsageChart from './ServiceUsageChart';

interface MetricsDashboardProps {
  metrics: UsageMetrics;
  organizations: Organization[];
  logs: AccessLog[];
  services: Service[];
}

export default function MetricsDashboard({
  metrics,
  organizations,
  logs,
  services,
}: MetricsDashboardProps) {
  const [selectedOrg, setSelectedOrg] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('7d');

  const filteredLogs = logs.filter(log => {
    const isOrgMatch = selectedOrg === 'all' || log.userId.startsWith(selectedOrg);
    const logDate = new Date(log.timestamp);
    const now = new Date();
    const daysDiff = (now.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24);
    
    switch (dateRange) {
      case '7d':
        return daysDiff <= 7 && isOrgMatch;
      case '30d':
        return daysDiff <= 30 && isOrgMatch;
      case '90d':
        return daysDiff <= 90 && isOrgMatch;
      default:
        return isOrgMatch;
    }
  });

  const downloadReport = () => {
    const csvContent = [
      ['User', 'Service', 'Action', 'Timestamp'].join(','),
      ...filteredLogs.map(log => 
        [log.userName, log.service, log.action, log.timestamp].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `usage-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-gray-400" />
            <select
              value={selectedOrg}
              onChange={(e) => setSelectedOrg(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Organizations</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>{org.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </select>
          </div>
        </div>
        <button
          onClick={downloadReport}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </button>
      </div>

      {/* Service Usage Chart */}
      <ServiceUsageChart services={services} />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Active Users</h3>
          <div className="flex items-end space-x-2">
            <div className="text-3xl font-bold text-blue-600">{metrics.activeUsers}</div>
            <div className="text-sm text-gray-500">/ {metrics.maxUsers} total</div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full"
              style={{ width: `${(metrics.activeUsers / metrics.maxUsers) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Reports Generated</h3>
          <div className="flex items-end space-x-2">
            <div className="text-3xl font-bold text-green-600">{metrics.reportsGenerated}</div>
            <div className="text-sm text-gray-500">/ {metrics.maxReports} limit</div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-green-600 rounded-full"
              style={{ width: `${(metrics.reportsGenerated / metrics.maxReports) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Active Pipelines</h3>
          <div className="flex items-end space-x-2">
            <div className="text-3xl font-bold text-purple-600">{metrics.activePipelines}</div>
            <div className="text-sm text-gray-500">/ {metrics.maxPipelines} available</div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-purple-600 rounded-full"
              style={{ width: `${(metrics.activePipelines / metrics.maxPipelines) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Access Logs */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
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
              {filteredLogs.map((log) => (
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
  );
}