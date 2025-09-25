import React, { useState, useMemo } from 'react';
import { Search, Edit, Trash2, PlusCircle, User, Package, Hash } from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  receivedDate: string;
  incharge: string;
}

// --- INITIAL DATA ---
const initialInventory: InventoryItem[] = [
  { id: 1, name: 'Breadboard Kit', quantity: 35, receivedDate: '2025-08-20', incharge: 'Mr. Arun' },
  { id: 2, name: 'Digital Multimeter', quantity: 20, receivedDate: '2025-09-05', incharge: 'Ms. Pooja' },
  { id: 3, name: 'Soldering Station', quantity: 15, receivedDate: '2025-08-25', incharge: 'Mr. Samir' },
  { id: 4, name: 'Projector', quantity: 8, receivedDate: '2025-09-01', incharge: 'Ms. Priya' },
  { id: 5, name: 'LAN Cable (10m)', quantity: 25, receivedDate: '2025-08-21', incharge: 'Mr. Manoj' },
  { id: 6, name: 'File Folder (A4)', quantity: 60, receivedDate: '2025-08-14', incharge: 'Mr. Rakesh' },
  { id: 7, name: 'Scientific Calculator', quantity: 40, receivedDate: '2025-08-19', incharge: 'Ms. Nisha' },
  { id: 8, name: 'UPS (1 kVA)', quantity: 10, receivedDate: '2025-08-27', incharge: 'Ms. Geeta' },
  { id: 9, name: 'MATLAB License Key', quantity: 30, receivedDate: '2025-09-09', incharge: 'Mr. Suresh' },
  { id: 10, name: 'Desktop PC', quantity: 28, receivedDate: '2025-08-30', incharge: 'Ms. Kavita' },
];

// --- STYLES OBJECT FOR CONSISTENT STYLING ---
const styles = {
  page: "p-4 sm:p-6 lg:p-8 w-full min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans",
  headerContainer: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4",
  header: "text-3xl font-bold text-gray-800 dark:text-gray-200",
  
  statsGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8",
  statCard: "bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-4",
  statIcon: "p-3 rounded-full",
  statValue: "text-3xl font-bold",
  statLabel: "text-sm text-gray-500 dark:text-gray-400",

  filterCard: "bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 mb-8 shadow-sm",
  filterGrid: "grid grid-cols-1 md:grid-cols-2 gap-4",
  filterGroup: "relative",
  filterInput: "w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500",
  filterSelect: "w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500",
  filterIcon: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400",

  tableContainer: "w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-md bg-white dark:bg-gray-900",
  table: "w-full min-w-[800px]",
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
};

// --- MODAL COMPONENTS ---
function InventoryForm({ item, onSave, onCancel, mode }: { item?: InventoryItem, onSave: (item: InventoryItem) => void, onCancel: () => void, mode: 'add' | 'edit' }) {
  const [formData, setFormData] = useState<InventoryItem>(
    item || { id: 0, name: '', quantity: 1, receivedDate: new Date().toISOString().split('T')[0], incharge: '' }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'quantity' ? Math.max(0, Number(value)) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const title = mode === 'add' ? 'Add New Inventory Item' : 'Edit Inventory Item';
  const buttonText = mode === 'add' ? 'Add Item' : 'Save Changes';

  return (
    <div className={styles.modalBackdrop}>
      <form onSubmit={handleSubmit} className={styles.modalContent}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <div className="space-y-4">
          <div><label className={styles.formLabel}>Item Name</label><input name="name" value={formData.name} onChange={handleChange} className={styles.formInput} required /></div>
          <div><label className={styles.formLabel}>Quantity</label><input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="1" className={styles.formInput} required /></div>
          <div><label className={styles.formLabel}>Received Date</label><input type="date" name="receivedDate" value={formData.receivedDate} onChange={handleChange} className={styles.formInput} required /></div>
          <div><label className={styles.formLabel}>Incharge Person</label><input name="incharge" value={formData.incharge} onChange={handleChange} className={styles.formInput} required /></div>
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
        <p className="text-gray-600 dark:text-gray-400">Are you sure you want to delete this item? This action cannot be undone.</p>
        <div className={styles.modalActions}>
          <button onClick={onCancel} className={`${styles.button} ${styles.buttonSecondary}`}>Cancel</button>
          <button onClick={onConfirm} className={`${styles.button} ${styles.buttonDanger}`}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// --- MAIN INVENTORY DASHBOARD COMPONENT ---
export default function InventoryManagementDashboard() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<InventoryItem | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [inchargeFilter, setInchargeFilter] = useState('All');

  const stats = useMemo(() => {
    const totalQuantity = inventory.reduce((sum, item) => sum + item.quantity, 0);
    const uniqueIncharges = new Set(inventory.map(item => item.incharge)).size;
    return {
      itemTypes: inventory.length,
      totalQuantity,
      uniqueIncharges,
    };
  }, [inventory]);

  const incharges = useMemo(() => ['All', ...Array.from(new Set(inventory.map((item) => item.incharge)))], [inventory]);

  const handleSave = (itemToSave: InventoryItem) => {
    if (itemToSave.id === 0) {
      setInventory([...inventory, { ...itemToSave, id: Date.now() }]);
      setIsAdding(false);
    } else {
      setInventory(inventory.map((item) => (item.id === itemToSave.id ? itemToSave : item)));
      setEditingItem(null);
    }
  };

  const handleDelete = (id: number) => {
    setInventory(inventory.filter((item) => item.id !== id));
    setDeleteConfirmItem(null);
  };

  const filteredInventory = useMemo(() => inventory.filter((item) => {
    return (inchargeFilter === 'All' || item.incharge === inchargeFilter) &&
           (item.name.toLowerCase().includes(searchFilter.toLowerCase()));
  }), [inventory, inchargeFilter, searchFilter]);

  return (
    <div className={styles.page}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Inventory Items</h1>
        <button onClick={() => setIsAdding(true)} className={`${styles.button} ${styles.buttonPrimary}`}>
          <PlusCircle size={18} /> Add New Item
        </button>
      </div>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}><div className={`${styles.statIcon} bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400`}><Package size={24} /></div><div><div className={styles.statValue}>{stats.itemTypes}</div><div className={styles.statLabel}>Item Types</div></div></div>
        <div className={styles.statCard}><div className={`${styles.statIcon} bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400`}><Hash size={24} /></div><div><div className={styles.statValue}>{stats.totalQuantity}</div><div className={styles.statLabel}>Total Quantity</div></div></div>
        <div className={styles.statCard}><div className={`${styles.statIcon} bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400`}><User size={24} /></div><div><div className={styles.statValue}>{stats.uniqueIncharges}</div><div className={styles.statLabel}>Incharge Personnel</div></div></div>
      </div>

      <div className={styles.filterCard}>
        <div className={styles.filterGrid}>
          <div className={`${styles.filterGroup} md:col-span-1`}>
            <Search className={styles.filterIcon} />
            <input type="text" placeholder="Search by item name..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} className={styles.filterInput} />
          </div>
          <select onChange={(e) => setInchargeFilter(e.target.value)} value={inchargeFilter} className={styles.filterSelect}>
            {incharges.map((incharge) => <option key={incharge} value={incharge}>{incharge === 'All' ? 'All Incharges' : incharge}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableHeader}>Item Name</th><th className={styles.tableHeader}>Quantity</th><th className={styles.tableHeader}>Received Date</th><th className={styles.tableHeader}>Incharge</th><th className={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length === 0 ? (
              <tr><td colSpan={5} className={styles.emptyRow}>No inventory items match your criteria.</td></tr>
            ) : (
              filteredInventory.map((item) => (
                <tr key={item.id} className={styles.tableRow}>
                  <td className={`${styles.tableCell} font-medium`}>{item.name}</td>
                  <td className={styles.tableCell}>{item.quantity}</td>
                  <td className={styles.tableCell}>{new Date(item.receivedDate + 'T00:00:00').toLocaleDateString()}</td>
                  <td className={styles.tableCell}>{item.incharge}</td>
                  <td className={styles.tableCell}>
                    <div className={styles.actionsCell}>
                      <button onClick={() => setEditingItem(item)} className={`${styles.actionButton} text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/50`} title="Edit"><Edit size={18} /></button>
                      <button onClick={() => setDeleteConfirmItem(item)} className={`${styles.actionButton} text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50`} title="Delete"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {(editingItem || isAdding) && <InventoryForm mode={isAdding ? 'add' : 'edit'} item={editingItem || undefined} onSave={handleSave} onCancel={() => { setEditingItem(null); setIsAdding(false); }} />}
      {deleteConfirmItem && <ConfirmationModal onConfirm={() => handleDelete(deleteConfirmItem.id)} onCancel={() => setDeleteConfirmItem(null)} />}
    </div>
  );
}
