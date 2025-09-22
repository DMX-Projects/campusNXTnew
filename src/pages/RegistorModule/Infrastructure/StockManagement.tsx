import React, { useState } from 'react';

type StockStatus = 'Received' | 'Pending';

interface StockItem {
  id: number;
  item: string;
  quantity: number;
  department: string;
  sentDate: string;
  status: StockStatus;
  receivedIncharge: string;
}

const initialStock: StockItem[] = [
  { id: 1, item: 'Breadboard Kit', quantity: 35, department: 'ECE', sentDate: '2025-08-20', status: 'Received', receivedIncharge: 'Mr. Arun' },
  { id: 2, item: 'Digital Multimeter', quantity: 20, department: 'EEE', sentDate: '2025-09-05', status: 'Pending', receivedIncharge: '' },
  { id: 3, item: 'Soldering Station', quantity: 15, department: 'ECE', sentDate: '2025-08-25', status: 'Received', receivedIncharge: 'Mr. Samir' },
  { id: 4, item: 'Projector', quantity: 8, department: 'CSE', sentDate: '2025-09-01', status: 'Received', receivedIncharge: 'Ms. Priya' },
  { id: 5, item: 'LAN Cable (10m)', quantity: 25, department: 'IT', sentDate: '2025-08-21', status: 'Pending', receivedIncharge: '' },
];

type EditFormProps = {
  item: StockItem;
  onSave: (updatedItem: StockItem) => void;
  onCancel: () => void;
};

function EditForm({ item, onSave, onCancel }: EditFormProps) {
  const [formData, setFormData] = useState<StockItem>(item);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-primary-900 rounded-lg shadow-lg p-8 w-full max-w-lg text-primary-900 dark:text-primary-100">
        <h2 className="text-xl font-semibold mb-6">Edit Stock Item</h2>

        <label className="block mb-4">
          <span className="block mb-1 font-medium">Item Name</span>
          <input
            name="item"
            value={formData.item}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-primary-300 dark:border-primary-700 rounded focus:outline-none focus:ring-2 focus:ring-primary-400"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="block mb-1 font-medium">Quantity</span>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min={0}
            className="w-full px-4 py-2 border border-primary-300 dark:border-primary-700 rounded focus:outline-none focus:ring-2 focus:ring-primary-400"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="block mb-1 font-medium">Department</span>
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-primary-300 dark:border-primary-700 rounded focus:outline-none focus:ring-2 focus:ring-primary-400"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="block mb-1 font-medium">Sent Date</span>
          <input
            type="date"
            name="sentDate"
            value={formData.sentDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-primary-300 dark:border-primary-700 rounded focus:outline-none focus:ring-2 focus:ring-primary-400"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="block mb-1 font-medium">Status</span>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-primary-300 dark:border-primary-700 rounded focus:outline-none focus:ring-2 focus:ring-primary-400"
            required
          >
            <option>Received</option>
            <option>Pending</option>
          </select>
        </label>

        <label className="block mb-6">
          <span className="block mb-1 font-medium">Received Incharge</span>
          <input
            name="receivedIncharge"
            value={formData.receivedIncharge}
            onChange={handleChange}
            disabled={formData.status === 'Pending'}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
              formData.status === 'Pending'
                ? 'border-gray-300 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 cursor-not-allowed'
                : 'border-primary-300 dark:border-primary-700 focus:ring-primary-400'
            }`}
            required={formData.status === 'Received'}
          />
        </label>

        <div className="flex justify-end gap-4">
          <button type="button" onClick={onCancel} className="px-5 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition">
            Cancel
          </button>
          <button type="submit" className="px-5 py-2 rounded bg-primary-600 text-white hover:bg-primary-700 transition">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default function StockManagementTable() {
  const [stockItems, setStockItems] = useState<StockItem[]>(initialStock);
  const [editItem, setEditItem] = useState<StockItem | null>(null);

  const departments = ['All', ...Array.from(new Set(stockItems.map((item) => item.department)))];
  const statuses: (StockStatus | 'All')[] = ['All', 'Received', 'Pending'];

  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'All' | StockStatus>('All');
  const [itemFilter, setItemFilter] = useState('');

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setStockItems(stockItems.filter((item) => item.id !== id));
    }
  };

  const handleSave = (updatedItem: StockItem) => {
    setStockItems(stockItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
    setEditItem(null);
  };

  const filteredItems = stockItems.filter((item) => {
    const depMatch = departmentFilter === 'All' || item.department === departmentFilter;
    const statusMatch = statusFilter === 'All' || item.status === statusFilter;
    const itemNameMatch = item.item.toLowerCase().includes(itemFilter.toLowerCase());
    return depMatch && statusMatch && itemNameMatch;
  });

  const StatusBadge = ({ status }: { status: StockStatus }) => {
    const colors = {
      Received: 'bg-green-200 text-green-800',
      Pending: 'bg-yellow-200 text-yellow-800',
    };
    return <span className={`px-3 py-1 rounded-full font-semibold text-sm ${colors[status]}`}>{status}</span>;
  };

  return (
    <div className="p-8 w-full mx-0 space-y-6">
      <h1 className="text-2xl font-semibold text-primary-900 dark:text-primary-100">Stock Management</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <select
          onChange={(e) => setDepartmentFilter(e.target.value)}
          value={departmentFilter}
          className="px-4 py-2 rounded border border-primary-300 dark:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 w-full md:w-1/4"
        >
          {departments.map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setStatusFilter(e.target.value as StockStatus | 'All')}
          value={statusFilter}
          className="px-4 py-2 rounded border border-primary-300 dark:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 w-full md:w-1/4"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Filter by Item Name"
          value={itemFilter}
          onChange={(e) => setItemFilter(e.target.value)}
          className="px-4 py-2 rounded border border-primary-300 dark:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 w-full md:w-1/3"
        />
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg border border-primary-300 dark:border-primary-800 shadow">
        <table className="w-full min-w-full text-left">
          <thead className="bg-primary-100 dark:bg-primary-800 sticky top-0 z-10">
            <tr>
              <th className="px-8 py-4 font-semibold text-primary-900 dark:text-primary-100">Item</th>
              <th className="px-8 py-4 font-semibold text-primary-900 dark:text-primary-100">Quantity</th>
              <th className="px-8 py-4 font-semibold text-primary-900 dark:text-primary-100">Department</th>
              <th className="px-8 py-4 font-semibold text-primary-900 dark:text-primary-100">Sent Date</th>
              <th className="px-8 py-4 font-semibold text-primary-900 dark:text-primary-100">Status</th>
              <th className="px-8 py-4 font-semibold text-primary-900 dark:text-primary-100">Received Incharge</th>
              <th className="px-8 py-4 font-semibold text-primary-900 dark:text-primary-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-primary-700 dark:text-primary-300">
                  No stock items match the filter criteria.
                </td>
              </tr>
            )}
            {filteredItems.map((item) => {
              const editEnabled = item.status === 'Received' && (statusFilter === 'All' || statusFilter === 'Received');
              return (
                <tr key={item.id} className="border-t border-primary-300 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900 transition">
                  <td className="px-8 py-4">{item.item}</td>
                  <td className="px-8 py-4">{item.quantity}</td>
                  <td className="px-8 py-4">{item.department}</td>
                  <td className="px-8 py-4">{item.sentDate}</td>
                  <td className="px-8 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-8 py-4">{item.receivedIncharge || '-'}</td>
                  <td className="px-8 py-4 space-x-2">
                    <button
                      onClick={() => setEditItem(item)}
                      className={`px-4 py-2 rounded text-sm text-white ${editEnabled ? 'bg-primary-500 hover:bg-primary-600' : 'bg-gray-400 cursor-not-allowed'}`}
                      disabled={!editEnabled}
                      title={editEnabled ? 'Edit' : 'Edit disabled for pending status'}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this item?')) {
                          handleDelete(item.id);
                        }
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editItem && <EditForm item={editItem} onSave={handleSave} onCancel={() => setEditItem(null)} />}
    </div>
  );
}
