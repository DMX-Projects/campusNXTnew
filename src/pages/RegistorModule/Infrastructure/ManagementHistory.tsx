import { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';

interface HistoryRecord {
  id: string;
  assetName: string;
  expenditure: number;
  department: string;
  problemRaised: string;
  problemSolved: string | null;
  status: 'Resolved' | 'Pending' | 'In Progress';
}

const mockData: HistoryRecord[] = [
  {
    id: '1',
    assetName: 'Air Conditioner',
    expenditure: 4500,
    department: 'Electrical',
    problemRaised: '2025-08-01',
    problemSolved: '2025-08-06',
    status: 'Resolved',
  },
  {
    id: '2',
    assetName: 'Projector',
    expenditure: 1200,
    department: 'AV',
    problemRaised: '2025-08-20',
    problemSolved: null,
    status: 'Pending',
  },
  {
    id: '3',
    assetName: 'Computer Lab PCs',
    expenditure: 9000,
    department: 'IT',
    problemRaised: '2025-07-10',
    problemSolved: '2025-07-15',
    status: 'Resolved',
  },
  {
    id: '4',
    assetName: 'Library Lights',
    expenditure: 2000,
    department: 'Facility',
    problemRaised: '2025-09-01',
    problemSolved: null,
    status: 'Pending',
  },
  {
    id: '5',
    assetName: 'Networking Equipment',
    expenditure: 7500,
    department: 'IT',
    problemRaised: '2025-08-15',
    problemSolved: null,
    status: 'In Progress',
  },
  {
    id: '6',
    assetName: 'HVAC System',
    expenditure: 12000,
    department: 'Facility',
    problemRaised: '2025-07-25',
    problemSolved: '2025-08-10',
    status: 'Resolved',
  },
];

export default function ManagementHistory() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [assetFilter, setAssetFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  const uniqueAssets = useMemo(() => {
    return Array.from(new Set(mockData.map(item => item.assetName)));
  }, []);

  const uniqueDepartments = useMemo(() => {
    return Array.from(new Set(mockData.map(item => item.department)));
  }, []);

  const filteredData = useMemo(() => {
    return mockData.filter(record => {
      const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
      const matchesAsset = assetFilter === 'all' || record.assetName === assetFilter;
      const matchesDepartment = departmentFilter === 'all' || record.department === departmentFilter;
      return matchesStatus && matchesAsset && matchesDepartment;
    });
  }, [statusFilter, assetFilter, departmentFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                       focus:border-transparent transition-colors"
            >
              <option value="all">All Statuses</option>
              <option value="Resolved">Resolved</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>

          {/* Asset Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Asset
            </label>
            <select
              value={assetFilter}
              onChange={(e) => setAssetFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                       focus:border-transparent transition-colors"
            >
              <option value="all">All Assets</option>
              {uniqueAssets.map(asset => (
                <option key={asset} value={asset}>{asset}</option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Department
            </label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                       focus:border-transparent transition-colors"
            >
              <option value="all">All Departments</option>
              {uniqueDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-50 dark:bg-gray-700 transition-colors">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Asset Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Expenditure (₹)
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Raised Dept.
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Problem Raised
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Problem Solved
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredData.length > 0 ? (
                filteredData.map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {record.assetName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      ₹{record.expenditure.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {record.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {record.problemRaised}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {record.problemSolved || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    No records found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">
              Showing {filteredData.length} of {mockData.length} records
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              Total Expenditure: ₹{filteredData.reduce((sum, record) => sum + record.expenditure, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
