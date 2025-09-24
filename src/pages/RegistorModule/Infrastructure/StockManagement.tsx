import React, { useState, useMemo } from 'react';
import { Search, Edit, Trash2, CheckCircle, Clock, PlusCircle, Building, Package, XCircle, ThumbsUp, ThumbsDown } from 'lucide-react';

// --- TYPE DEFINITIONS ---
type StockStatus = 'Approved' | 'Pending' | 'Rejected';
interface StockItem {
  id: number;
  item: string;
  quantity: number;
  department: string;
  sentDate: string;
  status: StockStatus;
  approvedBy: string; // Renamed from receivedIncharge
  adminRemark: string;
}

// --- INITIAL DATA ---
const initialStock: StockItem[] = [
  { id: 1, item: 'Breadboard Kit', quantity: 35, department: 'ECE', sentDate: '2025-08-20', status: 'Approved', approvedBy: 'Mr. Arun', adminRemark: 'Approved for lab use.' },
  { id: 2, item: 'Digital Multimeter', quantity: 20, department: 'EEE', sentDate: '2025-09-05', status: 'Pending', approvedBy: '', adminRemark: '' },
  { id: 3, item: 'Soldering Station', quantity: 15, department: 'ECE', sentDate: '2025-08-25', status: 'Approved', approvedBy: 'Mr. Samir', adminRemark: 'Standard restock.' },
  { id: 4, item: 'Projector', quantity: 2, department: 'CSE', sentDate: '2025-09-01', status: 'Rejected', approvedBy: '', adminRemark: 'Budget exceeded. Re-submit next quarter.' },
  { id: 5, item: 'LAN Cable (10m)', quantity: 25, department: 'IT', sentDate: '2025-08-21', status: 'Pending', approvedBy: '', adminRemark: '' },
  { id: 6, item: 'Raspberry Pi 4 Kit', quantity: 10, department: 'CSE', sentDate: '2025-09-10', status: 'Pending', approvedBy: '', adminRemark: '' },
  { id: 7, item: 'Chemical Beakers (Set)', quantity: 50, department: 'Chemistry', sentDate: '2025-08-15', status: 'Approved', approvedBy: 'Dr. Varma', adminRemark: '' },
  { id: 8, item: 'Microscope Slides', quantity: 100, department: 'Biology', sentDate: '2025-09-08', status: 'Pending', approvedBy: '', adminRemark: '' },
];

// --- STYLES OBJECT ---
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
  filterGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
  filterGroup: "relative",
  filterInput: "w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500",
  filterSelect: "w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500",
  filterIcon: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400",

  tableContainer: "w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-md bg-white dark:bg-gray-900",
  table: "w-full min-w-[1200px]",
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
  formTextarea: "w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[80px]",
  modalActions: "flex justify-end gap-4 mt-8",
  button: "px-5 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105 inline-flex items-center gap-2",
  buttonPrimary: "bg-indigo-600 text-white hover:bg-indigo-700",
  buttonSecondary: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600",
  buttonDanger: "bg-red-600 text-white hover:bg-red-700",

  emptyRow: "text-center py-12 text-gray-500 dark:text-gray-400",
};

// --- STATUS BADGE COMPONENT ---
function StatusBadge({ status }: { status: StockStatus }) {
  const statusConfig = {
    Approved: { color: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300", Icon: CheckCircle },
    Pending: { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300", Icon: Clock },
    Rejected: { color: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300", Icon: XCircle },
  };
  const { color, Icon } = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-xs ${color}`}>
      <Icon size={14} />{status}
    </span>
  );
}

// --- MODAL COMPONENTS ---
function StockForm({ item, onSave, onCancel, mode }: { item?: StockItem, onSave: (item: StockItem) => void, onCancel: () => void, mode: 'add' | 'edit' }) {
  const [formData, setFormData] = useState<StockItem>(
    item || { id: 0, item: '', quantity: 1, department: '', sentDate: new Date().toISOString().split('T')[0], status: 'Pending', approvedBy: '', adminRemark: '' }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: name === 'quantity' ? Math.max(0, Number(value)) : value };
    if (name === 'status' && value !== 'Approved') {
      updatedFormData.approvedBy = '';
    }
    setFormData(updatedFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const isApproved = formData.status === 'Approved';
  const title = mode === 'add' ? 'Add New Stock Item' : 'Edit Stock Item';
  const buttonText = mode === 'add' ? 'Add Item' : 'Save Changes';

  return (
    <div className={styles.modalBackdrop}>
      <form onSubmit={handleSubmit} className={styles.modalContent}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <div className="space-y-4">
          <div><label className={styles.formLabel}>Item Name</label><input name="item" value={formData.item} onChange={handleChange} className={styles.formInput} required /></div>
          <div><label className={styles.formLabel}>Quantity</label><input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min={1} className={styles.formInput} required /></div>
          <div><label className={styles.formLabel}>Department</label><input name="department" value={formData.department} onChange={handleChange} className={styles.formInput} required /></div>
          <div><label className={styles.formLabel}>Sent Date</label><input type="date" name="sentDate" value={formData.sentDate} onChange={handleChange} className={styles.formInput} required /></div>
          <div>
            <label className={styles.formLabel}>Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className={styles.formInput} required>
              <option>Pending</option><option>Approved</option><option>Rejected</option>
            </select>
          </div>
          <div>
            <label className={styles.formLabel}>Approved By</label>
            <input name="approvedBy" value={formData.approvedBy} onChange={handleChange} disabled={!isApproved}
              className={`${styles.formInput} ${!isApproved ? 'cursor-not-allowed bg-gray-100 dark:bg-gray-800' : ''}`}
              required={isApproved}
            />
          </div>
           <div><label className={styles.formLabel}>Admin Remark</label><textarea name="adminRemark" value={formData.adminRemark} onChange={handleChange} className={styles.formTextarea} /></div>
        </div>
        <div className={styles.modalActions}>
          <button type="button" onClick={onCancel} className={`${styles.button} ${styles.buttonSecondary}`}>Cancel</button>
          <button type="submit" className={`${styles.button} ${styles.buttonPrimary}`}>{buttonText}</button>
        </div>
      </form>
    </div>
  );
}

function DecisionModal({ item, onDecision, onCancel, decisionType }: { item: StockItem, onDecision: (item: StockItem) => void, onCancel: () => void, decisionType: 'Approve' | 'Reject' }) {
    const [remark, setRemark] = useState('');
    const [approvedBy, setApprovedBy] = useState('');
    const [error, setError] = useState('');

    const handleConfirm = () => {
        if (decisionType === 'Approve' && !approvedBy.trim()) {
            setError('"Approved By" name is required.');
            return;
        }
        onDecision({
            ...item,
            status: decisionType === 'Approve' ? 'Approved' : 'Rejected',
            adminRemark: remark,
            approvedBy: decisionType === 'Approve' ? approvedBy : ''
        });
    };

    const title = `${decisionType} Stock Request`;
    const buttonClass = decisionType === 'Approve' ? styles.buttonPrimary : styles.buttonDanger;
    const buttonIcon = decisionType === 'Approve' ? <ThumbsUp size={16}/> : <ThumbsDown size={16}/>;

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>{title}</h2>
                <div className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">You are about to {decisionType.toLowerCase()} the request for **{item.quantity} x {item.item}** for the **{item.department}** department.</p>
                    {decisionType === 'Approve' && (
                        <div>
                            <label className={styles.formLabel}>Approved By (Incharge Name)</label>
                            <input 
                                value={approvedBy} 
                                onChange={(e) => {
                                    setApprovedBy(e.target.value);
                                    if(error) setError('');
                                }} 
                                className={`${styles.formInput} ${error ? 'border-red-500' : ''}`} 
                                required 
                            />
                            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                        </div>
                    )}
                    <div><label className={styles.formLabel}>Admin Remark (Optional)</label><textarea value={remark} onChange={(e) => setRemark(e.target.value)} className={styles.formTextarea} /></div>
                </div>
                <div className={styles.modalActions}>
                    <button type="button" onClick={onCancel} className={`${styles.button} ${styles.buttonSecondary}`}>Cancel</button>
                    <button type="button" onClick={handleConfirm} className={`${styles.button} ${buttonClass}`}>{buttonIcon} Confirm {decisionType}</button>
                </div>
            </div>
        </div>
    );
}

function ConfirmationModal({ onConfirm, onCancel }: { onConfirm: () => void, onCancel: () => void }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Confirm Deletion</h2>
        <p className="text-gray-600 dark:text-gray-400">Are you sure you want to delete this item? This action cannot be undone.</p>
        <div className={styles.modalActions}>
          <button onClick={onCancel} className={`${styles.button} ${styles.buttonSecondary}`}>Cancel</button>
          <button onClick={onConfirm} className={`${styles.button} ${styles.buttonDanger}`}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// --- MAIN STOCK MANAGEMENT COMPONENT ---
export default function StockManagementTable() {
  const [stockItems, setStockItems] = useState<StockItem[]>(initialStock);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [decisionItem, setDecisionItem] = useState<{item: StockItem, type: 'Approve' | 'Reject'} | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<StockItem | null>(null);

  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'All' | StockStatus>('All');
  const [itemFilter, setItemFilter] = useState('');

  const stats = useMemo(() => {
    const totalItems = stockItems.reduce((sum, item) => sum + item.quantity, 0);
    const pendingCount = stockItems.filter(item => item.status === 'Pending').length;
    const approvedCount = stockItems.filter(item => item.status === 'Approved').length;
    const rejectedCount = stockItems.filter(item => item.status === 'Rejected').length;
    const departmentCount = new Set(stockItems.map(item => item.department)).size;
    return { totalItems, pendingCount, approvedCount, rejectedCount, departmentCount };
  }, [stockItems]);

  const departments = useMemo(() => ['All', ...Array.from(new Set(stockItems.map((item) => item.department)))], [stockItems]);
  const statuses: (StockStatus | 'All')[] = ['All', 'Approved', 'Pending', 'Rejected'];

  const handleSave = (itemToSave: StockItem) => {
    if (itemToSave.id === 0) {
      setStockItems([...stockItems, { ...itemToSave, id: Date.now() }]);
      setIsAdding(false);
    } else {
      setStockItems(stockItems.map((item) => (item.id === itemToSave.id ? itemToSave : item)));
      setEditingItem(null);
    }
  };
  
  const handleDecision = (itemToUpdate: StockItem) => {
      setStockItems(stockItems.map(item => item.id === itemToUpdate.id ? itemToUpdate : item));
      setDecisionItem(null);
  };

  const handleDelete = (id: number) => {
    setStockItems(stockItems.filter((item) => item.id !== id));
    setDeleteConfirmItem(null);
  };

  const filteredItems = useMemo(() => stockItems.filter((item) => {
    return (departmentFilter === 'All' || item.department === departmentFilter) &&
           (statusFilter === 'All' || item.status === statusFilter) &&
           (item.item.toLowerCase().includes(itemFilter.toLowerCase()));
  }), [stockItems, departmentFilter, statusFilter, itemFilter]);

  return (
    <div className={styles.page}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Stock Management </h1>
        <button onClick={() => setIsAdding(true)} className={`${styles.button} ${styles.buttonPrimary}`}><PlusCircle size={18} /> Add New Stock</button>
      </div>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}><div className={`${styles.statIcon} bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400`}><Package size={24} /></div><div><div className={styles.statValue}>{stats.totalItems}</div><div className={styles.statLabel}>Total Items in Stock</div></div></div>
        <div className={styles.statCard}><div className={`${styles.statIcon} bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400`}><Clock size={24} /></div><div><div className={styles.statValue}>{stats.pendingCount}</div><div className={styles.statLabel}>Pending Requests</div></div></div>
        <div className={styles.statCard}><div className={`${styles.statIcon} bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400`}><CheckCircle size={24} /></div><div><div className={styles.statValue}>{stats.approvedCount}</div><div className={styles.statLabel}>Approved Requests</div></div></div>
        <div className={styles.statCard}><div className={`${styles.statIcon} bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400`}><XCircle size={24} /></div><div><div className={styles.statValue}>{stats.rejectedCount}</div><div className={styles.statLabel}>Rejected Requests</div></div></div>
      </div>

      <div className={styles.filterCard}>
        <div className={styles.filterGrid}>
          <div className={styles.filterGroup}><Search className={styles.filterIcon} /><input type="text" placeholder="Search by item name..." value={itemFilter} onChange={(e) => setItemFilter(e.target.value)} className={styles.filterInput} /></div>
          <select onChange={(e) => setDepartmentFilter(e.target.value)} value={departmentFilter} className={styles.filterSelect}>{departments.map((dep) => <option key={dep} value={dep}>{dep === 'All' ? 'All Departments' : dep}</option>)}</select>
          <select onChange={(e) => setStatusFilter(e.target.value as StockStatus | 'All')} value={statusFilter} className={styles.filterSelect}>{statuses.map((status) => <option key={status} value={status}>{status === 'All' ? 'All Statuses' : status}</option>)}</select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableHeader}>Item</th><th className={styles.tableHeader}>Qty</th><th className={styles.tableHeader}>Department</th><th className={styles.tableHeader}>Sent Date</th><th className={styles.tableHeader}>Status</th><th className={styles.tableHeader}>Approved By</th><th className={styles.tableHeader}>Admin Remark</th><th className={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr><td colSpan={8} className={styles.emptyRow}>No stock items match your criteria.</td></tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id} className={styles.tableRow}>
                  <td className={`${styles.tableCell} font-medium`}>{item.item}</td>
                  <td className={styles.tableCell}>{item.quantity}</td>
                  <td className={styles.tableCell}>{item.department}</td>
                  <td className={styles.tableCell}>{new Date(item.sentDate + 'T00:00:00').toLocaleDateString()}</td>
                  <td className={styles.tableCell}><StatusBadge status={item.status} /></td>
                  <td className={styles.tableCell}>{item.approvedBy || '—'}</td>
                  <td className={`${styles.tableCell} text-gray-500 italic`}>{item.adminRemark || '—'}</td>
                  <td className={styles.tableCell}>
                    <div className={styles.actionsCell}>
                        {item.status === 'Pending' ? (
                            <>
                                <button onClick={() => setDecisionItem({item, type: 'Approve'})} className={`${styles.actionButton} text-green-500 hover:bg-green-100 dark:hover:bg-green-900/50`} title="Approve"><ThumbsUp size={18} /></button>
                                <button onClick={() => setDecisionItem({item, type: 'Reject'})} className={`${styles.actionButton} text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50`} title="Reject"><ThumbsDown size={18} /></button>
                            </>
                        ) : (
                            <button onClick={() => setEditingItem(item)} className={`${styles.actionButton} text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/50`} title="Edit"><Edit size={18} /></button>
                        )}
                      <button onClick={() => setDeleteConfirmItem(item)} className={`${styles.actionButton} text-gray-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50`} title="Delete"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {(editingItem || isAdding) && <StockForm mode={isAdding ? 'add' : 'edit'} item={editingItem || undefined} onSave={handleSave} onCancel={() => { setEditingItem(null); setIsAdding(false); }} />}
      {decisionItem && <DecisionModal item={decisionItem.item} decisionType={decisionItem.type} onDecision={handleDecision} onCancel={() => setDecisionItem(null)} />}
      {deleteConfirmItem && <ConfirmationModal onConfirm={() => handleDelete(deleteConfirmItem.id)} onCancel={() => setDeleteConfirmItem(null)} />}
    </div>
  );
}