import React, { useState, useMemo } from 'react';

interface Asset {
  id: number;
  name: string;
  count: number;
  department: string;
  location: string;
  lastMaintenance: string;
}

interface MaintenanceLog {
  id: number;
  assetId: number;
  date: string;
  note: string;
  upcoming: boolean;
}

const initialAssets: Asset[] = [
  { id: 1, name: 'Projector', count: 5, department: 'CSE', location: 'Classroom 101', lastMaintenance: '2025-08-20' },
  { id: 2, name: 'Air Conditioner', count: 15, department: 'Admin', location: 'Admin Block', lastMaintenance: '2025-09-05' },
  { id: 3, name: 'Desktop PC', count: 40, department: 'IT', location: 'Lab 3', lastMaintenance: '2025-08-15' },
  { id: 4, name: 'Printer', count: 10, department: 'EEE', location: 'Lab 1', lastMaintenance: '2025-07-30' },
];

const initialMaintenanceLogs: MaintenanceLog[] = [
  { id: 1, assetId: 2, date: '2025-09-05', note: 'Compressor replaced', upcoming: false },
  { id: 2, assetId: 3, date: '2025-08-15', note: 'Power supply repair', upcoming: false },
  { id: 3, assetId: 2, date: '2025-09-25', note: 'Scheduled filter cleaning', upcoming: true },
];

function MaintenanceSidebar({
  assetId,
  logs,
  onClose,
}: {
  assetId: number | null;
  logs: MaintenanceLog[];
  onClose: () => void;
}) {
  if (!assetId) return null;
  const assetLogs = logs.filter((log) => log.assetId === assetId);
  return (
    <aside className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-primary-900 border-l border-primary-300 dark:border-primary-700 shadow-lg p-4 overflow-y-auto z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">Maintenance Logs</h3>
        <button onClick={onClose} aria-label="Close" className="text-primary-900 dark:text-primary-100 hover:text-red-600 dark:hover:text-red-400 text-2xl">×</button>
      </div>
      {assetLogs.length === 0 && <p className="text-primary-700 dark:text-primary-300">No maintenance records.</p>}
      <ul className="space-y-3">
        {assetLogs.map((log) => (
          <li key={log.id} className="p-3 rounded border border-primary-200 dark:border-primary-700 bg-primary-50 dark:bg-primary-800">
            <div className="flex justify-between text-sm font-semibold text-primary-800 dark:text-primary-200">
              <span>{log.date}</span>
              {log.upcoming && <span className="text-accent-600 font-bold">Upcoming</span>}
            </div>
            <p className="mt-1 text-primary-900 dark:text-primary-100">{log.note}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default function AssetManagement() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [assetNameFilter, setAssetNameFilter] = useState('All');
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Asset | null>(null);

  // Unique department and asset names for filters
  const departments = useMemo(() => ['All', ...Array.from(new Set(assets.map(a => a.department)))], [assets]);
  const assetNames = useMemo(() => ['All', ...Array.from(new Set(assets.map(a => a.name)))], [assets]);

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this asset?')) {
      setAssets((prev) => prev.filter((a) => a.id !== id));
      if (selectedAssetId === id) setSelectedAssetId(null);
      if (editRowId === id) {
        setEditRowId(null);
        setEditData(null);
      }
    }
  };

  const handleEditStart = (asset: Asset) => {
    setEditRowId(asset.id);
    setEditData({ ...asset });
  };

  const handleEditChange = (field: keyof Asset, value: string | number) => {
    if (!editData) return;
    setEditData({ ...editData, [field]: value });
  };

  const handleEditSave = () => {
    if (!editData) return;
    setAssets(assets =>
      assets.map(a => (a.id === editData.id ? editData : a))
    );
    setEditRowId(null);
    setEditData(null);
  };

  const handleEditCancel = () => {
    setEditRowId(null);
    setEditData(null);
  };

  // Filter assets by department and asset name
  const filteredAssets = assets.filter((a) => {
    const matchDept = departmentFilter === 'All' || a.department === departmentFilter;
    const matchName = assetNameFilter === 'All' || a.name === assetNameFilter;
    return matchDept && matchName;
  });

  return (
    <div className="relative flex w-full h-full">
      <div className="flex-grow p-8 overflow-auto">
        <h1 className="text-2xl font-semibold mb-6 text-primary-900 dark:text-primary-100">Fixed Assets Management</h1>

        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="w-48 px-4 py-2 rounded border border-primary-300 dark:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 text-primary-900 dark:text-primary-100"
          >
            {departments.map((dep) => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>
          <select
            value={assetNameFilter}
            onChange={(e) => setAssetNameFilter(e.target.value)}
            className="w-48 px-4 py-2 rounded border border-primary-300 dark:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 text-primary-900 dark:text-primary-100"
          >
            {assetNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto rounded-lg border border-primary-300 dark:border-primary-800 shadow">
          <table className="w-full min-w-full text-left">
            <thead className="bg-primary-100 dark:bg-primary-800 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 font-semibold text-primary-900 dark:text-primary-100">Asset Name</th>
                <th className="px-6 py-3 font-semibold text-primary-900 dark:text-primary-100">Count</th>
                <th className="px-6 py-3 font-semibold text-primary-900 dark:text-primary-100">Department</th>
                <th className="px-6 py-3 font-semibold text-primary-900 dark:text-primary-100">Location</th>
                <th className="px-6 py-3 font-semibold text-primary-900 dark:text-primary-100">Last Maintenance</th>
                <th className="px-6 py-3 font-semibold text-primary-900 dark:text-primary-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-primary-700 dark:text-primary-300">
                    No assets found for selected filters.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => (
                  <tr
                    key={asset.id}
                    onClick={() => setSelectedAssetId(asset.id)}
                    className={`cursor-pointer border-t border-primary-300 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900 transition ${
                      selectedAssetId === asset.id ? 'bg-primary-100 dark:bg-primary-800' : ''
                    }`}
                    tabIndex={0}
                    role="row"
                  >
                    {editRowId === asset.id ? (
                      <>
                        <td className="px-6 py-4">
                          <input
                            value={editData?.name ?? ''}
                            onChange={e => handleEditChange('name', e.target.value)}
                            className="border px-2 py-1 rounded w-full"
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="number"
                            min={1}
                            value={editData?.count ?? 1}
                            onChange={e => handleEditChange('count', parseInt(e.target.value, 10))}
                            className="border px-2 py-1 rounded w-20 text-center"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            value={editData?.department ?? ''}
                            onChange={e => handleEditChange('department', e.target.value)}
                            className="border px-2 py-1 rounded w-full"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            value={editData?.location ?? ''}
                            onChange={e => handleEditChange('location', e.target.value)}
                            className="border px-2 py-1 rounded w-full"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="date"
                            value={editData?.lastMaintenance ?? ''}
                            onChange={e => handleEditChange('lastMaintenance', e.target.value)}
                            className="border px-2 py-1 rounded w-full"
                          />
                        </td>
                        <td className="px-6 py-4 space-x-2 text-center">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleEditSave();
                            }}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleEditCancel();
                            }}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">{asset.name}</td>
                        <td className="px-6 py-4 text-center">{asset.count}</td>
                        <td className="px-6 py-4">{asset.department}</td>
                        <td className="px-6 py-4">{asset.location}</td>
                        <td className="px-6 py-4">{asset.lastMaintenance}</td>
                        <td className="px-6 py-4 space-x-2 text-center">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleEditStart(asset);
                            }}
                            className="bg-primary-500 hover:bg-primary-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleDelete(asset.id);
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <MaintenanceSidebar assetId={selectedAssetId} logs={initialMaintenanceLogs} onClose={() => setSelectedAssetId(null)} />
    </div>
  );
}
