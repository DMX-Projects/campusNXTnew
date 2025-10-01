import { useState } from 'react';
import { Plus, Search, Filter, Download, Upload, X, FileText, Check, Clock, Package } from 'lucide-react';

interface Purchase {
  id: string;
  itemName: string;
  vendorName: string;
  datePurchased: string;
  status: 'Pending' | 'Received' | 'Inspected';
  notes: string;
  attachments: string[];
}

const initialPurchases: Purchase[] = [
  {
    id: '1',
    itemName: 'Computer Desk',
    vendorName: 'ABC Furnish',
    datePurchased: '2025-09-15',
    status: 'Received',
    notes: 'Good quality',
    attachments: ['PO_001.pdf', 'GRN_001.pdf']
  },
  {
    id: '2',
    itemName: 'UPS Battery',
    vendorName: 'PowerTech',
    datePurchased: '2025-09-18',
    status: 'Pending',
    notes: 'Urgent need',
    attachments: ['PO_002.pdf']
  },
  {
    id: '3',
    itemName: 'Network Switch',
    vendorName: 'TechVendor Inc',
    datePurchased: '2025-09-20',
    status: 'Inspected',
    notes: 'Installation pending',
    attachments: ['PO_003.pdf', 'GRN_003.pdf', 'Invoice_003.pdf']
  }
];

function App() {
  const [purchases, setPurchases] = useState<Purchase[]>(initialPurchases);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVendor, setFilterVendor] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    itemName: '',
    vendorName: '',
    datePurchased: '',
    status: 'Pending' as Purchase['status'],
    notes: '',
    attachments: [] as string[]
  });

  const vendors = ['all', ...Array.from(new Set(purchases.map(p => p.vendorName)))];

  const handleAddPurchase = () => {
    if (!formData.itemName || !formData.vendorName || !formData.datePurchased) {
      alert('Please fill in all required fields');
      return;
    }

    const newPurchase: Purchase = {
      id: Date.now().toString(),
      ...formData
    };

    setPurchases([newPurchase, ...purchases]);
    setIsAddModalOpen(false);
    setFormData({
      itemName: '',
      vendorName: '',
      datePurchased: '',
      status: 'Pending',
      notes: '',
      attachments: []
    });
  };

  const handleFileUpload = () => {
    const fileName = prompt('Enter file name (e.g., PO_004.pdf):');
    if (fileName) {
      setFormData({
        ...formData,
        attachments: [...formData.attachments, fileName]
      });
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter((_, i) => i !== index)
    });
  };

  const handleExport = () => {
    alert('Export functionality triggered. CSV/PDF export would happen here.');
  };

  const handleViewPurchase = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setIsViewModalOpen(true);
  };

  const handleUpdateStatus = (id: string, newStatus: Purchase['status']) => {
    setPurchases(purchases.map(p =>
      p.id === id ? { ...p, status: newStatus } : p
    ));
  };

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = purchase.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVendor = filterVendor === 'all' || purchase.vendorName === filterVendor;
    const matchesStatus = filterStatus === 'all' || purchase.status === filterStatus;
    return matchesSearch && matchesVendor && matchesStatus;
  });

  const getStatusIcon = (status: Purchase['status']) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      case 'Received':
        return <Package className="w-4 h-4" />;
      case 'Inspected':
        return <Check className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Purchase['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Received':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Inspected':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Purchase Management</h1>
         
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by item or vendor name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="w-full lg:w-48">
              <label className="block text-sm font-medium text-slate-700 mb-2">Vendor</label>
              <select
                value={filterVendor}
                onChange={(e) => setFilterVendor(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
              >
                {vendors.map(vendor => (
                  <option key={vendor} value={vendor}>
                    {vendor === 'all' ? 'All Vendors' : vendor}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full lg:w-48">
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Received">Received</option>
                <option value="Inspected">Inspected</option>
              </select>
            </div>

            <button
              onClick={handleExport}
              className="px-6 py-2.5 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-all flex items-center gap-2 shadow-sm hover:shadow"
            >
              <Download className="w-4 h-4" />
              Export
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm hover:shadow"
            >
              <Plus className="w-4 h-4" />
              Add Purchase
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Item Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Vendor Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Date Purchased
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Attachments
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredPurchases.map((purchase) => (
                  <tr key={purchase.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{purchase.itemName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-700">{purchase.vendorName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-600">{new Date(purchase.datePurchased).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={purchase.status}
                          onChange={(e) => handleUpdateStatus(purchase.id, e.target.value as Purchase['status'])}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(purchase.status)} cursor-pointer`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Received">Received</option>
                          <option value="Inspected">Inspected</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-600">{purchase.attachments.length} file(s)</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewPurchase(purchase)}
                        className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPurchases.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No purchases found</p>
            </div>
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Add New Purchase</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  placeholder="e.g., Computer Desk, UPS Battery"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Vendor Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.vendorName}
                  onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                  placeholder="e.g., ABC Furnish, PowerTech"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Date Purchased <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.datePurchased}
                  onChange={(e) => setFormData({ ...formData, datePurchased: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Purchase['status'] })}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="Pending">Pending</option>
                  <option value="Received">Received</option>
                  <option value="Inspected">Inspected</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any relevant comments on delivery, item quality, or procurement reason..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Attachments</label>
                <button
                  onClick={handleFileUpload}
                  className="w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-slate-600 hover:text-blue-600"
                >
                  <Upload className="w-5 h-5" />
                  Upload Documents (PO, GRN, etc.)
                </button>

                {formData.attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-700">{file}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveAttachment(index)}
                          className="p-1 hover:bg-slate-200 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-slate-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex gap-3 justify-end">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-6 py-2.5 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPurchase}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow font-medium"
              >
                Add Purchase
              </button>
            </div>
          </div>
        </div>
      )}

      {isViewModalOpen && selectedPurchase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Purchase Details</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Item Name</label>
                  <p className="text-lg font-semibold text-slate-900">{selectedPurchase.itemName}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Vendor Name</label>
                  <p className="text-lg font-semibold text-slate-900">{selectedPurchase.vendorName}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Date Purchased</label>
                  <p className="text-lg text-slate-900">{new Date(selectedPurchase.datePurchased).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Status</label>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedPurchase.status)}`}>
                    {getStatusIcon(selectedPurchase.status)}
                    {selectedPurchase.status}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-500 mb-2">Notes</label>
                <p className="text-slate-900 bg-slate-50 p-4 rounded-lg">
                  {selectedPurchase.notes || 'No notes provided'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-500 mb-3">Attachments ({selectedPurchase.attachments.length})</label>
                {selectedPurchase.attachments.length > 0 ? (
                  <div className="space-y-2">
                    {selectedPurchase.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-500" />
                          <span className="text-slate-900 font-medium">{file}</span>
                        </div>
                        <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-center py-4">No attachments</p>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-end">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
