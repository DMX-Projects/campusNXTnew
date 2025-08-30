import React, { useState } from 'react';
import { DollarSign, CreditCard, Receipt, AlertCircle, Check, X } from 'lucide-react';
import { fines, bookIssues, books, members } from './Data/mockData';

export default function LateFee() {
  const [activeTab, setActiveTab] = useState<'pending' | 'paid' | 'waived'>('pending');

  const filterFines = (status: string) => {
    return fines.filter(fine => fine.status === status);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Waived': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingFines = filterFines('Pending');
  const paidFines = filterFines('Paid');
  const waivedFines = filterFines('Waived');

  const totalPending = pendingFines.reduce((sum, fine) => sum + fine.amount, 0);
  const totalCollected = paidFines.reduce((sum, fine) => sum + fine.amount, 0);
  const totalWaived = waivedFines.reduce((sum, fine) => sum + fine.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-green-600" />
            Late Fees & Fines
          </h2>
          <p className="text-gray-600">Manage library fines and payments</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <CreditCard className="h-4 w-4" />
          Record Payment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Pending Fines</span>
          </div>
          <p className="text-2xl font-bold text-yellow-900 mt-1">${totalPending.toFixed(2)}</p>
          <p className="text-sm text-yellow-600">{pendingFines.length} members</p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Collected</span>
          </div>
          <p className="text-2xl font-bold text-green-900 mt-1">${totalCollected.toFixed(2)}</p>
          <p className="text-sm text-green-600">This month</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Waived</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 mt-1">${totalWaived.toFixed(2)}</p>
          <p className="text-sm text-blue-600">{waivedFines.length} fines</p>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold text-purple-900 mt-1">${(totalCollected * 12).toFixed(2)}</p>
          <p className="text-sm text-purple-600">Yearly estimate</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'pending'
              ? 'bg-white text-yellow-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <AlertCircle className="h-4 w-4" />
          Pending ({pendingFines.length})
        </button>
        <button
          onClick={() => setActiveTab('paid')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'paid'
              ? 'bg-white text-green-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Check className="h-4 w-4" />
          Paid ({paidFines.length})
        </button>
        <button
          onClick={() => setActiveTab('waived')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'waived'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <X className="h-4 w-4" />
          Waived ({waivedFines.length})
        </button>
      </div>

      {/* Fee Structure */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Fee Structure</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900">Books</h4>
            <p className="text-sm text-gray-600 mt-1">$0.50 per day</p>
            <p className="text-xs text-gray-500">Maximum: $10.00</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900">Journals</h4>
            <p className="text-sm text-gray-600 mt-1">$1.00 per day</p>
            <p className="text-xs text-gray-500">Maximum: $25.00</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900">Reference Books</h4>
            <p className="text-sm text-gray-600 mt-1">$2.00 per day</p>
            <p className="text-xs text-gray-500">Maximum: $50.00</p>
          </div>
        </div>
      </div>

      {/* Fines Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filterFines(activeTab === 'pending' ? 'Pending' : activeTab === 'paid' ? 'Paid' : 'Waived')
                .map((fine) => {
                const issue = bookIssues.find(i => i.id === fine.issueId);
                const book = books.find(b => b.id === issue?.bookId);
                const member = members.find(m => m.id === fine.memberId);

                return (
                  <tr key={fine.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{member?.name}</div>
                        <div className="text-sm text-gray-500">{member?.email}</div>
                        <div className="text-xs text-gray-400">{member?.membershipType}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{book?.title}</div>
                        <div className="text-sm text-gray-500">by {book?.author}</div>
                        <div className="text-xs text-gray-400">ISBN: {book?.isbn}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{fine.reason}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-semibold text-gray-900">${fine.amount.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(fine.createdDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(fine.status)}`}>
                        {fine.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {activeTab === 'pending' && (
                        <>
                          <button className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors">
                            Mark Paid
                          </button>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
                            Waive
                          </button>
                        </>
                      )}
                      {activeTab === 'paid' && (
                        <span className="text-green-600 flex items-center gap-1">
                          <Receipt className="h-4 w-4" />
                          Paid
                        </span>
                      )}
                      {activeTab === 'waived' && (
                        <span className="text-blue-600 flex items-center gap-1">
                          <X className="h-4 w-4" />
                          Waived
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Form Modal would go here */}
    </div>
  );
}