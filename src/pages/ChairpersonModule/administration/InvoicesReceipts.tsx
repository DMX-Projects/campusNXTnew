import React, { useState } from 'react';
import { FileText, DollarSign, Calendar, Download, Eye, Plus, Search, Filter, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  description: string;
  amount: number;
  tax: number;
  totalAmount: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  paymentMethod?: string;
  paymentDate?: string;
  category: string;
  items: {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }[];
}

const InvoicesReceipts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const invoices: Invoice[] = [
    {
      id: 'INV001',
      invoiceNumber: 'INV-2024-001',
      clientName: 'Tech Solutions Inc.',
      clientEmail: 'billing@techsolutions.com',
      description: 'Software Development Services',
      amount: 5000,
      tax: 500,
      totalAmount: 5500,
      issueDate: '2024-01-01',
      dueDate: '2024-01-31',
      status: 'paid',
      paymentMethod: 'Bank Transfer',
      paymentDate: '2024-01-25',
      category: 'Services',
      items: [
        { description: 'Web Application Development', quantity: 1, rate: 3000, amount: 3000 },
        { description: 'Mobile App Development', quantity: 1, rate: 2000, amount: 2000 }
      ]
    },
    {
      id: 'INV002',
      invoiceNumber: 'INV-2024-002',
      clientName: 'Education Partners Ltd.',
      clientEmail: 'accounts@edupartners.com',
      description: 'Training Program Services',
      amount: 3500,
      tax: 350,
      totalAmount: 3850,
      issueDate: '2024-01-05',
      dueDate: '2024-02-05',
      status: 'pending',
      category: 'Training',
      items: [
        { description: 'Faculty Training Program', quantity: 2, rate: 1500, amount: 3000 },
        { description: 'Training Materials', quantity: 1, rate: 500, amount: 500 }
      ]
    },
    {
      id: 'INV003',
      invoiceNumber: 'INV-2024-003',
      clientName: 'Research Institute',
      clientEmail: 'finance@research.org',
      description: 'Research Collaboration',
      amount: 8000,
      tax: 800,
      totalAmount: 8800,
      issueDate: '2024-01-10',
      dueDate: '2024-01-25',
      status: 'overdue',
      category: 'Research',
      items: [
        { description: 'Research Project Phase 1', quantity: 1, rate: 5000, amount: 5000 },
        { description: 'Data Analysis Services', quantity: 1, rate: 3000, amount: 3000 }
      ]
    },
    {
      id: 'INV004',
      invoiceNumber: 'INV-2024-004',
      clientName: 'Global Consulting',
      clientEmail: 'billing@globalconsult.com',
      description: 'Consulting Services',
      amount: 4200,
      tax: 420,
      totalAmount: 4620,
      issueDate: '2024-01-12',
      dueDate: '2024-02-12',
      status: 'pending',
      category: 'Consulting',
      items: [
        { description: 'Strategic Planning Consultation', quantity: 3, rate: 1000, amount: 3000 },
        { description: 'Implementation Support', quantity: 2, rate: 600, amount: 1200 }
      ]
    },
    {
      id: 'INV005',
      invoiceNumber: 'INV-2024-005',
      clientName: 'Manufacturing Corp',
      clientEmail: 'ap@manufacturing.com',
      description: 'Equipment Maintenance',
      amount: 2800,
      tax: 280,
      totalAmount: 3080,
      issueDate: '2024-01-15',
      dueDate: '2024-02-15',
      status: 'cancelled',
      category: 'Maintenance',
      items: [
        { description: 'Equipment Inspection', quantity: 1, rate: 1500, amount: 1500 },
        { description: 'Maintenance Services', quantity: 1, rate: 1300, amount: 1300 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || invoice.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(i => i.status === 'paid').length;
  const pendingInvoices = invoices.filter(i => i.status === 'pending').length;
  const overdueInvoices = invoices.filter(i => i.status === 'overdue').length;
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.totalAmount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Invoices & Receipts</h1>
          <p className="text-gray-600">Manage billing, invoices, and payment receipts</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Invoices</p>
                <p className="text-2xl font-bold text-indigo-600">{totalInvoices}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Paid</p>
                <p className="text-2xl font-bold text-green-600">{paidInvoices}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingInvoices}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{overdueInvoices}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-600">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by invoice number, client name, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Categories</option>
                <option value="Services">Services</option>
                <option value="Training">Training</option>
                <option value="Research">Research</option>
                <option value="Consulting">Consulting</option>
                <option value="Maintenance">Maintenance</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Plus className="w-4 h-4" />
                New Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Invoices List */}
        <div className="space-y-6">
          {filteredInvoices.map((invoice) => (
            <div key={invoice.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{invoice.invoiceNumber}</h3>
                        <p className="text-sm text-gray-500">{invoice.clientName}</p>
                        <p className="text-xs text-gray-400">{invoice.clientEmail}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {invoice.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Description</p>
                    <p className="text-gray-700">{invoice.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium text-gray-900">${invoice.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tax</p>
                      <p className="font-medium text-gray-900">${invoice.tax.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-bold text-indigo-600">${invoice.totalAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Due Date</p>
                      <p className="font-medium text-gray-900">{invoice.dueDate}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Issued: {invoice.issueDate}</span>
                    </div>
                    {invoice.paymentDate && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">Paid: {invoice.paymentDate}</span>
                      </div>
                    )}
                  </div>

                  {invoice.paymentMethod && (
                    <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800">
                        <strong>Payment Method:</strong> {invoice.paymentMethod}
                      </p>
                    </div>
                  )}

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Items</h4>
                    <div className="space-y-2">
                      {invoice.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">{item.description} (x{item.quantity})</span>
                          <span className="font-medium text-gray-900">${item.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  {invoice.status === 'pending' && (
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <CheckCircle className="w-4 h-4" />
                      Mark Paid
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicesReceipts;