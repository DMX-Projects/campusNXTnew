import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Search, Filter, Edit2, Eye, Trash2, Package } from 'lucide-react';
import { PurchaseRequisition } from '../../../types';

export const PurchaseRequisitions: React.FC = () => {
  const [requisitions] = useState<PurchaseRequisition[]>([
    {
      id: '1',
      itemName: 'Dell PowerEdge Server',
      quantity: 2,
      unitPrice: 5000,
      totalAmount: 10000,
      department: 'IT',
      requestedBy: 'John Smith',
      status: 'Approved',
      requestDate: '2024-01-16',
      justification: 'Server upgrade for improved performance'
    },
    {
      id: '2',
      itemName: 'Laboratory Microscopes',
      quantity: 5,
      unitPrice: 2500,
      totalAmount: 12500,
      department: 'R&D',
      requestedBy: 'Dr. Sarah Johnson',
      status: 'Pending',
      requestDate: '2024-01-18',
      justification: 'New research project requirements'
    },
    {
      id: '3',
      itemName: 'Office Chairs',
      quantity: 20,
      unitPrice: 250,
      totalAmount: 5000,
      department: 'HR',
      requestedBy: 'Mike Wilson',
      status: 'Ordered',
      requestDate: '2024-01-20',
      justification: 'Ergonomic seating for new employees'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedRequisition, setSelectedRequisition] = useState<PurchaseRequisition | null>(null);

  // Function to format amount in Indian currency format
  const formatIndianCurrency = (amount: number) => {
    return amount.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR'
    });
  };

  const filteredRequisitions = requisitions.filter(req => {
    const matchesSearch = req.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openModal = (type: 'add' | 'edit' | 'view', requisition?: PurchaseRequisition) => {
    setModalType(type);
    setSelectedRequisition(requisition || null);
    setShowModal(true);
  };

  const getStatusColor = (status: PurchaseRequisition['status']) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'Rejected': return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      case 'Ordered': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      default: return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
    }
  };

  // Modal component that will be rendered via portal
  const Modal = () => (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={() => setShowModal(false)}
      />
      
      {/* Modal content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {modalType === 'add' ? 'New Purchase Request' : 
             modalType === 'edit' ? 'Edit Purchase Request' : 
             'Purchase Request Details'}
          </h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Item Name
              </label>
              <input
                type="text"
                defaultValue={selectedRequisition?.itemName}
                disabled={modalType === 'view'}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  defaultValue={selectedRequisition?.quantity}
                  disabled={modalType === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Unit Price (₹)
                </label>
                <input
                  type="number"
                  defaultValue={selectedRequisition?.unitPrice}
                  disabled={modalType === 'view'}
                  placeholder="Enter price in INR"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Department
              </label>
              <select
                defaultValue={selectedRequisition?.department}
                disabled={modalType === 'view'}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
              >
                <option>IT</option>
                <option>R&D</option>
                <option>Marketing</option>
                <option>HR</option>
                <option>Finance</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Justification
              </label>
              <textarea
                rows={3}
                defaultValue={selectedRequisition?.justification}
                disabled={modalType === 'view'}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
              />
            </div>
          </form>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {modalType === 'view' ? 'Close' : 'Cancel'}
            </button>
            {modalType !== 'view' && (
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {modalType === 'add' ? 'Submit Request' : 'Save Changes'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Purchase Requisitions</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage ad-hoc purchase requests</p>
        </div>
        <button
          onClick={() => openModal('add')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Request</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Requests', value: '156', color: 'blue' },
          { title: 'Pending', value: '23', color: 'yellow' },
          { title: 'Approved', value: '98', color: 'green' },
          { title: 'This Month', value: '₹45,23,000', color: 'purple' }
        ].map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <div className={`w-8 h-8 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-lg flex items-center justify-center mr-3`}>
                <Package className={`h-4 w-4 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search requisitions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Ordered">Ordered</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requisitions Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Item Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Requestor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRequisitions.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{req.itemName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{req.department} Department</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{req.quantity}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{formatIndianCurrency(req.unitPrice)}/unit</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatIndianCurrency(req.totalAmount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{req.requestedBy}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(req.requestDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(req.status)}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => openModal('view', req)}
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white p-1 rounded"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openModal('edit', req)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render Modal via Portal */}
      {showModal && createPortal(
        <Modal />,
        document.body
      )}
    </div>
  );
};
