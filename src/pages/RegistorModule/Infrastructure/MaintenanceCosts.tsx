import React, { useState, useMemo } from 'react';

interface MaintenanceRequest {
  id: number;
  assetName: string;
  expenditure: number;
  requestedDate: string; // ISO date
  status: 'Pending' | 'Approved' | 'Rejected';
  department: string;
  selectedVendor?: string;
}

const initialRequests: MaintenanceRequest[] = [
  { id: 1, assetName: 'Air Conditioner', expenditure: 5000, requestedDate: '2025-09-15', status: 'Pending', department: 'Facility' },
  { id: 2, assetName: 'Projector', expenditure: 2000, requestedDate: '2025-09-10', status: 'Approved', department: 'CSE', selectedVendor: 'AV Services' },
  { id: 3, assetName: 'Computers', expenditure: 15000, requestedDate: '2025-08-30', status: 'Pending', department: 'IT' },
  { id: 4, assetName: 'Library Fittings', expenditure: 10000, requestedDate: '2025-09-01', status: 'Rejected', department: 'Library' },
];

const vendorOptions = ['AV Services', 'Cooling Experts', 'IT Repairs', 'Facility Maintenance', 'Library Services'];

export default function MaintenanceCosts() {
  const [requests, setRequests] = useState(initialRequests);
  const [filters, setFilters] = useState({ status: '', assetName: '', department: '' });

  const uniqueAssets = useMemo(() => Array.from(new Set(requests.map(r => r.assetName))), [requests]);
  const uniqueDepartments = useMemo(() => Array.from(new Set(requests.map(r => r.department))), [requests]);

  const filteredRequests = useMemo(() => {
    return requests.filter(r =>
      (filters.status === '' || r.status === filters.status) &&
      (filters.assetName === '' || r.assetName.toLowerCase().includes(filters.assetName.toLowerCase())) &&
      (filters.department === '' || r.department === filters.department)
    );
  }, [requests, filters]);

  const handleApprove = (id: number) => {
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'Approved' } : r))
    );
    alert('Request approved');
  };

  const handleReject = (id: number) => {
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'Rejected' } : r))
    );
    alert('Request rejected');
  };

  const handleSelectVendor = (id: number, vendor: string) => {
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, selectedVendor: vendor } : r))
    );
    alert(`Vendor '${vendor}' assigned`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-primary-900 dark:text-primary-100">Maintenance Costs - Income/Expenditure</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={filters.status}
          onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}
          className="bg-white dark:bg-gray-900 border border-primary-300 dark:border-primary-700 rounded px-4 py-2"
        >
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          value={filters.assetName}
          onChange={(e) => setFilters(f => ({ ...f, assetName: e.target.value }))}
          className="bg-white dark:bg-gray-900 border border-primary-300 dark:border-primary-700 rounded px-4 py-2 flex-grow min-w-[180px]"
          placeholder="Filter by Asset Name"
        >
          <option value="">Filter by Asset</option>
          {uniqueAssets.map(asset => (
            <option key={asset} value={asset}>{asset}</option>
          ))}
        </select>

        <select
          value={filters.department}
          onChange={(e) => setFilters(f => ({ ...f, department: e.target.value }))}
          className="bg-white dark:bg-gray-900 border border-primary-300 dark:border-primary-700 rounded px-4 py-2"
        >
          <option value="">Filter by Department</option>
          {uniqueDepartments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-primary-300 dark:border-primary-700 rounded-lg shadow">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-primary-100 dark:bg-primary-800 text-primary-900 dark:text-primary-100">
            <tr>
              <th className="px-6 py-3 font-semibold">Asset Name</th>
              <th className="px-6 py-3 font-semibold">Expenditure (₹)</th>
              <th className="px-6 py-3 font-semibold">Requested Date</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">Department</th>
              <th className="px-6 py-3 font-semibold">Vendor</th>
              <th className="px-6 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-primary-900">
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-primary-700 dark:text-primary-400">
                  No matching expenditure requests found
                </td>
              </tr>
            )}
            {filteredRequests.map(request => (
              <tr key={request.id} className="border-t border-primary-200 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900">
                <td className="px-6 py-4">{request.assetName}</td>
                <td className="px-6 py-4 font-medium">₹{request.expenditure}</td>
                <td className="px-6 py-4">{request.requestedDate}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      request.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                        request.status === 'Approved' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4">{request.department}</td>
                <td className="px-6 py-4">{request.selectedVendor ?? '-'}</td>
                <td className="px-6 py-4 flex gap-3">
                  {request.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {request.status === 'Approved' && (
                    <select
                      onChange={(e) => handleSelectVendor(request.id, e.target.value)}
                      value={request.selectedVendor ?? ''}
                      className="p-2 rounded border border-primary-300 dark:border-primary-700 bg-white dark:bg-primary-800"
                    >
                      <option value="" disabled>
                        Select Vendor
                      </option>
                      {vendorOptions.map(vendor => (
                        <option key={vendor} value={vendor}>
                          {vendor}
                        </option>
                      ))}
                    </select>
                  )}
                  {(request.status === 'Rejected') && (
                    <span className="italic text-red-600">Request Rejected</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
