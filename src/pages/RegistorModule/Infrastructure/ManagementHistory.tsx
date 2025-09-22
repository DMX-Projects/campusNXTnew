import React, { useState, useMemo } from 'react';

interface Transaction {
  id: number;
  assetName: string;
  expenditure: number;
  problemRaisedDate: string;
  problemSolvedDate?: string;
  problemRaisedDepartment: string;
  status: 'Pending' | 'Resolved';
}

const initialTransactions: Transaction[] = [
  {
    id: 1,
    assetName: 'Air Conditioner',
    expenditure: 4500,
    problemRaisedDate: '2025-08-01',
    problemSolvedDate: '2025-08-06',
    problemRaisedDepartment: 'Electrical',
    status: 'Resolved',
  },
  {
    id: 2,
    assetName: 'Projector',
    expenditure: 1200,
    problemRaisedDate: '2025-08-20',
    problemRaisedDepartment: 'AV',
    status: 'Pending',
  },
  {
    id: 3,
    assetName: 'Computer Lab PCs',
    expenditure: 9000,
    problemRaisedDate: '2025-07-10',
    problemSolvedDate: '2025-07-15',
    problemRaisedDepartment: 'IT',
    status: 'Resolved',
  },
  {
    id: 4,
    assetName: 'Library Lights',
    expenditure: 2000,
    problemRaisedDate: '2025-09-01',
    problemRaisedDepartment: 'Facility',
    status: 'Pending',
  },
];

export default function ManagementHistory() {
  const [transactions] = useState<Transaction[]>(initialTransactions);
  const [statusFilter, setStatusFilter] = useState('');
  const [assetFilter, setAssetFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const uniqueAssets = useMemo(() =>
    Array.from(new Set(transactions.map(t => t.assetName))), [transactions]
  );
  const uniqueDepartments = useMemo(() =>
    Array.from(new Set(transactions.map(t => t.problemRaisedDepartment))), [transactions]
  );

  const filteredTransactions = useMemo(() =>
    transactions.filter(t =>
      (statusFilter === '' || t.status === statusFilter) &&
      (assetFilter === '' || t.assetName === assetFilter) &&
      (departmentFilter === '' || t.problemRaisedDepartment === departmentFilter)
    ), [transactions, statusFilter, assetFilter, departmentFilter]
  );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border rounded px-4 py-2 bg-white dark:bg-gray-900"
          aria-label="Filter by Status"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>

        <select
          value={assetFilter}
          onChange={e => setAssetFilter(e.target.value)}
          className="border rounded px-4 py-2 bg-white dark:bg-gray-900"
          aria-label="Filter by Asset"
        >
          <option value="">All Assets</option>
          {uniqueAssets.map(asset => (
            <option key={asset} value={asset}>{asset}</option>
          ))}
        </select>

        <select
          value={departmentFilter}
          onChange={e => setDepartmentFilter(e.target.value)}
          className="border rounded px-4 py-2 bg-white dark:bg-gray-900"
          aria-label="Filter by Department"
        >
          <option value="">All Departments</option>
          {uniqueDepartments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto rounded-lg border shadow">
        <table className="w-full min-w-[850px] text-left">
          <thead className="bg-primary-100 dark:bg-primary-800">
            <tr>
              <th className="px-4 sm:px-6 py-3 font-semibold">Asset Name</th>
              <th className="px-4 sm:px-6 py-3 font-semibold">Expenditure (₹)</th>
              <th className="px-4 sm:px-6 py-3 font-semibold">Raised Dept.</th>
              <th className="px-4 sm:px-6 py-3 font-semibold">Problem Raised</th>
              <th className="px-4 sm:px-6 py-3 font-semibold">Problem Solved</th>
              <th className="px-4 sm:px-6 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-primary-900 divide-y divide-primary-200 dark:divide-primary-700">
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-primary-700 dark:text-primary-400">
                  No records found for the current filters.
                </td>
              </tr>
            )}
            {filteredTransactions.map(transaction => (
              <tr key={transaction.id} className="hover:bg-primary-50 dark:hover:bg-primary-900 transition cursor-default">
                <td className="px-4 sm:px-6 py-4">{transaction.assetName}</td>
                <td className="px-4 sm:px-6 py-4 font-semibold">₹{transaction.expenditure}</td>
                <td className="px-4 sm:px-6 py-4">{transaction.problemRaisedDepartment}</td>
                <td className="px-4 sm:px-6 py-4">{transaction.problemRaisedDate}</td>
                <td className="px-4 sm:px-6 py-4">{transaction.problemSolvedDate ?? '-'}</td>
                <td className="px-4 sm:px-6 py-4">
                  <span className={`px-3 py-1 rounded-full font-semibold text-sm \
                    ${transaction.status === 'Resolved' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
