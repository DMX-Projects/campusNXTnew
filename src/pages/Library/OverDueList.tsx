import React, { useState } from 'react';
import { AlertTriangle, Calendar, Phone, Mail, DollarSign, Send } from 'lucide-react';
import { bookIssues, books, members, fines } from './Data/mockData';

export default function OverdueList() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const overdueIssues = bookIssues.filter(issue => issue.status === 'Overdue');

  const calculateDaysOverdue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = today.getTime() - due.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateFine = (daysOverdue: number) => {
    const finePerDay = 0.50;
    return daysOverdue * finePerDay;
  };

  const toggleSelection = (issueId: string) => {
    setSelectedItems(prev => 
      prev.includes(issueId) 
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === overdueIssues.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(overdueIssues.map(issue => issue.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            Overdue Books
          </h2>
          <p className="text-gray-600">{overdueIssues.length} books overdue</p>
        </div>
        
        <div className="flex gap-2">
          <button 
            disabled={selectedItems.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
            Send Reminders ({selectedItems.length})
          </button>
          <button 
            disabled={selectedItems.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <DollarSign className="h-4 w-4" />
            Apply Fines ({selectedItems.length})
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-red-800">Total Overdue</span>
          </div>
          <p className="text-2xl font-bold text-red-900 mt-1">{overdueIssues.length}</p>
        </div>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Avg Days Late</span>
          </div>
          <p className="text-2xl font-bold text-orange-900 mt-1">
            {Math.round(overdueIssues.reduce((acc, issue) => acc + calculateDaysOverdue(issue.dueDate), 0) / overdueIssues.length)}
          </p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Potential Fines</span>
          </div>
          <p className="text-2xl font-bold text-yellow-900 mt-1">
            ${overdueIssues.reduce((acc, issue) => acc + calculateFine(calculateDaysOverdue(issue.dueDate)), 0).toFixed(2)}
          </p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Reminders Sent</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 mt-1">24</p>
        </div>
      </div>

      {/* Overdue List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedItems.length === overdueIssues.length && overdueIssues.length > 0}
              onChange={toggleSelectAll}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">
              Select All ({overdueIssues.length} items)
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Select
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days Overdue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fine Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {overdueIssues.map((issue) => {
                const book = books.find(b => b.id === issue.bookId);
                const member = members.find(m => m.id === issue.memberId);
                const daysOverdue = calculateDaysOverdue(issue.dueDate);
                const fineAmount = calculateFine(daysOverdue);

                return (
                  <tr key={issue.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(issue.id)}
                        onChange={() => toggleSelection(issue.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{book?.title}</div>
                        <div className="text-sm text-gray-500">by {book?.author}</div>
                        <div className="text-xs text-gray-400">ISBN: {book?.isbn}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{member?.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {member?.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {member?.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center gap-1 text-red-600">
                        <Calendar className="h-4 w-4" />
                        {new Date(issue.dueDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-sm font-medium bg-red-100 text-red-800 rounded-full">
                        {daysOverdue} days
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-semibold text-red-600">
                        ${fineAmount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded">
                        Send Reminder
                      </button>
                      <button className="text-orange-600 hover:text-orange-800 bg-orange-50 px-2 py-1 rounded">
                        Apply Fine
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}