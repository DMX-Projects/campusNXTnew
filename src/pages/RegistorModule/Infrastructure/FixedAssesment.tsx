import React, { useState, useMemo } from 'react';
import { Search, Edit, Trash2, PlusCircle, Building, Wrench, Package, DollarSign, X, Calendar as CalendarIcon, CheckSquare, Archive, Server } from 'lucide-react';

// --- TYPE DEFINITIONS ---
type AssetStatus = 'In Use' | 'In Storage' | 'Under Maintenance';

interface IndividualAsset {
  id: number;
  assetId: string; // Unique user-facing ID like 'PC-001'
  type: string; // e.g., 'Desktop PC', 'Projector'
  status: AssetStatus;
  value: number;
  department: string;
  location: string;
  purchaseDate: string;
  lastMaintenance: string;
}

interface MaintenanceLog {
  id: number;
  assetId: number; // Links to IndividualAsset's primary key 'id'
  date: string;
  notes: string;
  isUpcoming: boolean;
}

// --- INITIAL DATA ---
const initialAssets: IndividualAsset[] = [
  { id: 1, assetId: 'PROJ-001', type: 'Projector', status: 'In Use', value: 15000, department: 'CSE', location: 'Classroom 101', purchaseDate: '2024-08-01', lastMaintenance: '2025-08-20' },
  { id: 2, assetId: 'PROJ-002', type: 'Projector', status: 'In Storage', value: 15000, department: 'CSE', location: 'CSE Storeroom', purchaseDate: '2024-08-01', lastMaintenance: '2025-08-20' },
  { id: 3, assetId: 'AC-001', type: 'Air Conditioner', status: 'In Use', value: 30000, department: 'Admin', location: 'Admin Block - Office 1', purchaseDate: '2023-05-10', lastMaintenance: '2025-09-05' },
  { id: 4, assetId: 'AC-002', type: 'Air Conditioner', status: 'Under Maintenance', value: 30000, department: 'Admin', location: 'Admin Block - Office 2', purchaseDate: '2023-05-10', lastMaintenance: '2025-09-05' },
  { id: 5, assetId: 'PC-001', type: 'Desktop PC', status: 'In Use', value: 50000, department: 'IT', location: 'IT Lab 3 - Desk 01', purchaseDate: '2024-01-15', lastMaintenance: '2025-08-15' },
  { id: 6, assetId: 'PC-002', type: 'Desktop PC', status: 'In Use', value: 50000, department: 'IT', location: 'IT Lab 3 - Desk 02', purchaseDate: '2024-01-15', lastMaintenance: '2025-08-15' },
  { id: 7, assetId: 'PRNT-001', type: 'Laser Printer', status: 'In Use', value: 15000, department: 'EEE', location: 'EEE Lab 1', purchaseDate: '2023-11-20', lastMaintenance: '2025-07-30' },
  { id: 8, name: 'Water Purifier', assetId: 'WP-001', type: 'Water Purifier', status: 'In Use', value: 10000, department: 'Admin', location: 'Canteen', purchaseDate: '2024-02-01', lastMaintenance: '2025-09-15' },
];

const initialMaintenanceLogs: MaintenanceLog[] = [
  { id: 1, assetId: 3, date: '2025-09-05', notes: 'Compressor checked and gas refilled.', isUpcoming: false },
  { id: 2, assetId: 5, date: '2025-08-15', notes: 'Formatted and OS re-installed.', isUpcoming: false },
  { id: 3, assetId: 3, date: '2025-10-05', notes: 'Scheduled filter cleaning.', isUpcoming: true },
  { id: 4, assetId: 1, date: '2025-08-20', notes: 'Lamp hours checked, lens cleaned.', isUpcoming: false },
  { id: 5, assetId: 1, date: '2025-11-20', notes: 'Scheduled lamp replacement.', isUpcoming: true },
  { id: 6, assetId: 4, date: '2025-09-05', notes: 'Service call placed for paper jam issue.', isUpcoming: false },
];

// --- STYLES OBJECT FOR CONSISTENT STYLING ---
const styles = {
  page: "p-4 sm:p-6 lg:p-8 w-full min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans",
  headerContainer: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4",
  header: "text-3xl font-bold text-gray-800 dark:text-gray-200",
  
  statsGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
  statCard: "bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-4",
  statIcon: "p-3 rounded-full",
  statValue: "text-3xl font-bold",
  statLabel: "text-sm text-gray-500 dark:text-gray-400",

  filterCard: "bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 mb-8 shadow-sm",
  filterGrid: "grid grid-cols-1 md:grid-cols-3 gap-4",
  filterGroup: "relative",
  filterInput: "w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500",
  filterSelect: "w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500",
  filterIcon: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400",

  tableContainer: "w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-md bg-white dark:bg-gray-900",
  table: "w-full min-w-[1000px]",
  tableHead: "bg-gray-100 dark:bg-gray-800",
  tableHeader: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
  tableRow: "border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
  tableCell: "px-6 py-4 whitespace-nowrap text-sm",
  actionsCell: "flex items-center gap-2",
  actionButton: "p-2 rounded-md transition-colors",
  
  modalBackdrop: "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4",
  modalContent: "bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 w-full max-w-lg",
  modalTitle: "text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200",
  formLabel: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
  formInput: "w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500",
  modalActions: "flex justify-end gap-4 mt-8",
  button: "px-5 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105 inline-flex items-center gap-2",
  buttonPrimary: "bg-indigo-600 text-white hover:bg-indigo-700",
  buttonSecondary: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600",
  buttonDanger: "bg-red-600 text-white hover:bg-red-700",

  emptyRow: "text-center py-12 text-gray-500 dark:text-gray-400",

  sidebar: "fixed right-0 top-0 h-full w-full sm:w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-xl p-6 overflow-y-auto z-50 transition-transform transform",
  sidebarHeader: "flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700",
  sidebarTitle: "text-xl font-bold text-gray-800 dark:text-gray-200",
  sidebarCloseBtn: "p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800",
  logItem: "p-4 rounded-lg border border-gray-200 dark:border-gray-700",
};

// --- STATUS BADGE COMPONENT ---
function StatusBadge({ status }: { status: AssetStatus }) {
    const statusConfig = {
      'In Use': { color: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300", Icon: CheckSquare },
      'In Storage': { color: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300", Icon: Archive },
      'Under Maintenance': { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300", Icon: Wrench },
    };
    const { color, Icon } = statusConfig[status];
    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-xs ${color}`}>
        <Icon size={14} />{status}
      </span>
    );
}

// --- MODAL & SIDEBAR COMPONENTS ---
function AssetFormModal({ asset, onSave, onCancel, mode }: { asset?: IndividualAsset, onSave: (asset: IndividualAsset) => void, onCancel: () => void, mode: 'add' | 'edit' }) {
    const [formData, setFormData] = useState<Omit<IndividualAsset, 'id'>>(
      asset ? { ...asset } : { assetId: '', type: '', status: 'In Use', value: 0, department: '', location: '', purchaseDate: new Date().toISOString().split('T')[0], lastMaintenance: new Date().toISOString().split('T')[0] }
    );
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const isNumber = ['value'].includes(name);
      setFormData(prev => ({ ...prev, [name]: isNumber ? Math.max(0, Number(value)) : value }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({ ...formData, id: asset?.id || 0 });
    };
  
    const title = mode === 'add' ? 'Add New Asset' : 'Edit Asset';
    const buttonText = mode === 'add' ? 'Add Asset' : 'Save Changes';
  
    return (
      <div className={styles.modalBackdrop}>
        <form onSubmit={handleSubmit} className={styles.modalContent}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={styles.formLabel}>Asset ID</label><input name="assetId" value={formData.assetId} onChange={handleChange} className={styles.formInput} placeholder="e.g., PC-041" required /></div>
            <div><label className={styles.formLabel}>Asset Type</label><input name="type" value={formData.type} onChange={handleChange} className={styles.formInput} placeholder="e.g., Desktop PC" required /></div>
            <div><label className={styles.formLabel}>Status</label><select name="status" value={formData.status} onChange={handleChange} className={styles.formInput} required><option>In Use</option><option>In Storage</option><option>Under Maintenance</option></select></div>
            <div><label className={styles.formLabel}>Value (₹)</label><input type="number" name="value" value={formData.value} onChange={handleChange} min="0" className={styles.formInput} required /></div>
            <div><label className={styles.formLabel}>Department</label><input name="department" value={formData.department} onChange={handleChange} className={styles.formInput} required /></div>
            <div><label className={styles.formLabel}>Location</label><input name="location" value={formData.location} onChange={handleChange} className={styles.formInput} required /></div>
            <div><label className={styles.formLabel}>Purchase Date</label><input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} className={styles.formInput} required /></div>
            <div><label className={styles.formLabel}>Last Maintenance</label><input type="date" name="lastMaintenance" value={formData.lastMaintenance} onChange={handleChange} className={styles.formInput} required /></div>
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onCancel} className={`${styles.button} ${styles.buttonSecondary}`}>Cancel</button>
            <button type="submit" className={`${styles.button} ${styles.buttonPrimary}`}>{buttonText}</button>
          </div>
        </form>
      </div>
    );
}

function ConfirmationModal({ onConfirm, onCancel }: { onConfirm: () => void, onCancel: () => void }) {
    return (
      <div className={styles.modalBackdrop}>
        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>Confirm Deletion</h2>
          <p className="text-gray-600 dark:text-gray-400">Are you sure you want to delete this asset? This action cannot be undone.</p>
          <div className={styles.modalActions}>
            <button onClick={onCancel} className={`${styles.button} ${styles.buttonSecondary}`}>Cancel</button>
            <button onClick={onConfirm} className={`${styles.button} ${styles.buttonDanger}`}>Delete</button>
          </div>
        </div>
      </div>
    );
}
  
function MaintenanceSidebar({ asset, logs, onClose, onAddLog }: { asset: IndividualAsset | null, logs: MaintenanceLog[], onClose: () => void, onAddLog: (log: Omit<MaintenanceLog, 'id'>) => void }) {
    const [newLogNotes, setNewLogNotes] = useState('');
  
    if (!asset) return null;
  
    const assetLogs = logs.filter(log => log.assetId === asset.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
    const handleAddLog = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newLogNotes.trim()) return;
      onAddLog({
        assetId: asset.id,
        date: new Date().toISOString().split('T')[0],
        notes: newLogNotes,
        isUpcoming: false,
      });
      setNewLogNotes('');
    };
  
    return (
      <>
        <div className={`${styles.modalBackdrop} sm:hidden`} onClick={onClose}></div>
        <aside className={`${styles.sidebar} ${asset ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className={styles.sidebarHeader}>
            <h3 className={styles.sidebarTitle}>Maintenance for {asset.assetId}</h3>
            <button onClick={onClose} className={styles.sidebarCloseBtn}><X size={20} /></button>
          </div>
          
          <form onSubmit={handleAddLog} className="mb-6">
              <label className={styles.formLabel}>Add New Log Entry</label>
              <textarea value={newLogNotes} onChange={(e) => setNewLogNotes(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800" rows={3} placeholder="e.g., Replaced filter, checked wiring..."></textarea>
              <button type="submit" className={`${styles.button} ${styles.buttonPrimary} w-full mt-2`}>Add Log</button>
          </form>

          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">History</h4>
          <ul className="space-y-4">
            {assetLogs.length > 0 ? assetLogs.map(log => (
              <li key={log.id} className={`${styles.logItem} ${log.isUpcoming ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className={log.isUpcoming ? 'text-yellow-700 dark:text-yellow-400' : 'text-gray-700 dark:text-gray-300'}>{new Date(log.date + 'T00:00:00').toLocaleDateString()}</span>
                  {log.isUpcoming && <span className="px-2 py-0.5 rounded-full bg-yellow-200 text-yellow-800 text-xs">Upcoming</span>}
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{log.notes}</p>
              </li>
            )) : <p className="text-sm text-gray-500">No maintenance records found.</p>}
          </ul>
        </aside>
      </>
    );
}

// --- MAIN ASSET MANAGEMENT  COMPONENT ---
export default function AssetManagementDashboard() {
  const [assets, setAssets] = useState<IndividualAsset[]>(initialAssets);
  const [maintenanceLogs, setMaintenanceLogs] = useState<MaintenanceLog[]>(initialMaintenanceLogs);
  
  const [editingAsset, setEditingAsset] = useState<IndividualAsset | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingAsset, setDeletingAsset] = useState<IndividualAsset | null>(null);
  const [viewingLogsForAsset, setViewingLogsForAsset] = useState<IndividualAsset | null>(null);
  
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchFilter, setSearchFilter] = useState('');

  const stats = useMemo(() => ({
    totalValue: assets.reduce((sum, asset) => sum + asset.value, 0),
    totalAssets: assets.length,
    underMaintenance: assets.filter(a => a.status === 'Under Maintenance').length,
    inStorage: assets.filter(a => a.status === 'In Storage').length,
  }), [assets]);
  
  const departments = useMemo(() => ['All', ...Array.from(new Set(assets.map(a => a.department)))], [assets]);
  const statuses = useMemo(() => ['All', ...Array.from(new Set(assets.map(a => a.status)))], [assets]);

  const handleSave = (assetToSave: IndividualAsset) => {
    if (assetToSave.id === 0) {
      setAssets([...assets, { ...assetToSave, id: Date.now() }]);
      setIsAdding(false);
    } else {
      setAssets(assets.map(a => (a.id === assetToSave.id ? assetToSave : a)));
      setEditingAsset(null);
    }
  };

  const handleDelete = (id: number) => {
    setAssets(assets.filter(a => a.id !== id));
    setDeletingAsset(null);
  };
  
  const handleAddLog = (log: Omit<MaintenanceLog, 'id'>) => {
      setMaintenanceLogs([...maintenanceLogs, { ...log, id: Date.now() }]);
      setAssets(assets.map(a => a.id === log.assetId ? {...a, lastMaintenance: log.date, status: 'In Use'} : a));
  };

  const filteredAssets = useMemo(() => assets.filter(a => {
    return (departmentFilter === 'All' || a.department === departmentFilter) &&
           (statusFilter === 'All' || a.status === statusFilter) &&
           (a.type.toLowerCase().includes(searchFilter.toLowerCase()) || a.assetId.toLowerCase().includes(searchFilter.toLowerCase()));
  }), [assets, departmentFilter, statusFilter, searchFilter]);

  return (
    <div className={styles.page}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Asset Management </h1>
        <button onClick={() => setIsAdding(true)} className={`${styles.button} ${styles.buttonPrimary}`}><PlusCircle size={18} /> Add New Asset</button>
      </div>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}><div className={`${styles.statIcon} bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400`}><Package size={24}/></div><div><div className={styles.statValue}>{stats.totalAssets}</div><div className={styles.statLabel}>Total Assets</div></div></div>
        <div className={styles.statCard}><div className={`${styles.statIcon} bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400`}><DollarSign size={24}/></div><div><div className={styles.statValue}>₹{stats.totalValue.toLocaleString('en-IN')}</div><div className={styles.statLabel}>Total Asset Value</div></div></div>
        <div className={styles.statCard}><div className={`${styles.statIcon} bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400`}><Wrench size={24}/></div><div><div className={styles.statValue}>{stats.underMaintenance}</div><div className={styles.statLabel}>Under Maintenance</div></div></div>
        <div className={styles.statCard}><div className={`${styles.statIcon} bg-gray-100 dark:bg-gray-700/40 text-gray-600 dark:text-gray-400`}><Archive size={24}/></div><div><div className={styles.statValue}>{stats.inStorage}</div><div className={styles.statLabel}>In Storage</div></div></div>
      </div>

      <div className={styles.filterCard}>
        <div className={styles.filterGrid}>
          <div className={`${styles.filterGroup}`}><Search className={styles.filterIcon} /><input type="text" placeholder="Search by Asset ID or Type..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} className={styles.filterInput} /></div>
          <select onChange={(e) => setDepartmentFilter(e.target.value)} value={departmentFilter} className={styles.filterSelect}>{departments.map((dep) => <option key={dep} value={dep}>{dep === 'All' ? 'All Departments' : dep}</option>)}</select>
          <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter} className={styles.filterSelect}>{statuses.map((status) => <option key={status} value={status}>{status === 'All' ? 'All Statuses' : status}</option>)}</select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableHeader}>Asset ID</th><th className={styles.tableHeader}>Type</th><th className={styles.tableHeader}>Status</th><th className={styles.tableHeader}>Department</th><th className={styles.tableHeader}>Location</th><th className={styles.tableHeader}>Last Maintenance</th><th className={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.length === 0 ? (
              <tr><td colSpan={7} className={styles.emptyRow}>No assets match your criteria.</td></tr>
            ) : (
              filteredAssets.map((asset) => (
                <tr key={asset.id} className={styles.tableRow}>
                  <td className={`${styles.tableCell} font-medium`}>{asset.assetId}</td>
                  <td className={styles.tableCell}>{asset.type}</td>
                  <td className={styles.tableCell}><StatusBadge status={asset.status} /></td>
                  <td className={styles.tableCell}>{asset.department}</td>
                  <td className={styles.tableCell}>{asset.location}</td>
                  <td className={styles.tableCell}>{new Date(asset.lastMaintenance + 'T00:00:00').toLocaleDateString()}</td>
                  <td className={styles.tableCell}>
                    <div className={styles.actionsCell}>
                      <button onClick={() => setViewingLogsForAsset(asset)} className={`${styles.actionButton} text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800`} title="View Logs"><CalendarIcon size={18} /></button>
                      <button onClick={() => setEditingAsset(asset)} className={`${styles.actionButton} text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/50`} title="Edit"><Edit size={18} /></button>
                      <button onClick={() => setDeletingAsset(asset)} className={`${styles.actionButton} text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50`} title="Delete"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {(editingAsset || isAdding) && <AssetFormModal mode={isAdding ? 'add' : 'edit'} asset={editingAsset || undefined} onSave={handleSave} onCancel={() => { setEditingAsset(null); setIsAdding(false); }} />}
      {deletingAsset && <ConfirmationModal onConfirm={() => handleDelete(deletingAsset.id)} onCancel={() => setDeletingAsset(null)} />}
      <MaintenanceSidebar asset={viewingLogsForAsset} logs={maintenanceLogs} onClose={() => setViewingLogsForAsset(null)} onAddLog={handleAddLog} />
    </div>
  );
}